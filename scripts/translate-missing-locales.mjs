// scripts/translate-missing-locales.mjs
//
// Разовый скрипт: находит все localeString/localeText поля во всех
// документах Sanity, где заполнен "en", но пусты какие-то из de/fr/pl/lt,
// переводит недостающее через DeepL API (батчами, с ретраями на 429) и
// патчит документы напрямую (пишет в уже опубликованную версию, минуя
// черновики).
//
// v2: батчинг запросов к DeepL (по языку, пачками) + retry с backoff на
// 429/503 — версия v1 била по одному тексту за раз и упиралась в лимит.
//
// Запуск (Node 20.6+):
//   node --env-file=.env.local scripts/translate-missing-locales.mjs
//
// Запуск на более старой версии Node — сначала:
//   npm install dotenv
// и раскомментировать строку `import "dotenv/config";` ниже.
//
// Пробный прогон без записи (только показать, что будет переведено —
// DeepL всё равно вызывается, чтобы показать реальный перевод, но
// результат никуда не сохраняется):
//   node --env-file=.env.local scripts/translate-missing-locales.mjs --dry-run

// import "dotenv/config"; // раскомментировать, если нет --env-file

import { createClient } from "@sanity/client";

const DRY_RUN = process.argv.includes("--dry-run");
const BATCH_SIZE = 40; // текстов за один запрос к DeepL
const MAX_RETRIES = 6;
const BASE_BACKOFF_MS = 1500;
const DELAY_BETWEEN_BATCHES_MS = 400;

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;
const deeplApiKey = process.env.DEEPL_API_KEY;

if (!projectId || !token) {
  console.error(
    "Не хватает NEXT_PUBLIC_SANITY_PROJECT_ID или SANITY_API_WRITE_TOKEN в окружении."
  );
  process.exit(1);
}
if (!deeplApiKey) {
  console.error("Не хватает DEEPL_API_KEY в окружении.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const DEEPL_ENDPOINT = deeplApiKey.endsWith(":fx")
  ? "https://api-free.deepl.com/v2/translate"
  : "https://api.deepl.com/v2/translate";

// DeepL коды языков
const TARGET_LOCALES = { de: "DE", fr: "FR", pl: "PL", lt: "LT" };

const DOC_TYPES = ["equipment", "category", "obVan", "geoLanding", "caseStudy"];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// Переводит массив текстов ОДНИМ запросом к DeepL, с ретраями на 429/503.
// Возвращает массив переводов в том же порядке, что и texts.
async function deeplTranslateBatch(texts, targetLang) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const res = await fetch(DEEPL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${deeplApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: texts,
        source_lang: "EN",
        target_lang: targetLang,
      }),
    });

    if (res.status === 429 || res.status === 503) {
      const retryAfterHeader = res.headers.get("retry-after");
      const wait = retryAfterHeader
        ? parseInt(retryAfterHeader, 10) * 1000
        : Math.min(BASE_BACKOFF_MS * 2 ** attempt, 30000);
      console.log(
        `  DeepL ${res.status} (лимит), жду ${wait}мс и повторяю — попытка ${
          attempt + 1
        }/${MAX_RETRIES}`
      );
      await sleep(wait);
      continue;
    }

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`DeepL error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data.translations.map((t) => t.text);
  }

  throw new Error(
    `DeepL: превышено число попыток (${MAX_RETRIES}) после повторных 429/503 для target=${targetLang}`
  );
}

const LOCALE_KEYS = ["en", "de", "fr", "pl", "lt"];

// Поля, которые НЕ нужно переводить, даже если они по форме — locale-объект.
// "name" — это модель/бренд оборудования (напр. "Blackmagic Micro Studio
// Camera 4K G2") и название OB Van юнита — собственные имена, перевод даёт
// кашу. Проверяется по последнему сегменту пути (после точки), так что
// работает и для "name", и для "specs[0].name" и т.п.
const EXCLUDED_FIELD_KEYS = new Set(["name"]);

function lastPathSegment(path) {
  const withoutIndex = path.replace(/\[\d+\]/g, "");
  const parts = withoutIndex.split(".");
  return parts[parts.length - 1];
}

// Структурная проверка вместо проверки по _type: некоторые поля
// (например "name" в equipment) объявлены как инлайновый {type: "object",
// fields: [...]} без общего именованного типа localeString/localeText, и
// тогда Sanity не всегда сохраняет узнаваемый "_type". Поэтому определяем
// locale-объект по форме: есть непустой "en", и ВСЕ остальные ключи (кроме
// служебных, начинающихся с "_") — это подмножество {en,de,fr,pl,lt}.
function isLocaleObject(node) {
  if (!node || typeof node !== "object" || Array.isArray(node)) return false;
  const keys = Object.keys(node).filter((k) => !k.startsWith("_"));
  if (keys.length === 0) return false;
  if (typeof node.en !== "string" || !node.en.trim()) return false;
  return keys.every((k) => LOCALE_KEYS.includes(k));
}

// Рекурсивно ищет локализуемые объекты (localeString/localeText, а также
// анонимные инлайн-object поля той же формы) с заполненным "en" и хотя бы
// одним пустым целевым языком.
function collectLocaleFields(node, path, out) {
  if (Array.isArray(node)) {
    node.forEach((item, i) => collectLocaleFields(item, `${path}[${i}]`, out));
    return;
  }
  if (node && typeof node === "object") {
    if (isLocaleObject(node)) {
      if (EXCLUDED_FIELD_KEYS.has(lastPathSegment(path))) {
        return; // например "name" — собственное имя, не переводим
      }
      const missing = Object.keys(TARGET_LOCALES).filter(
        (locale) => !node[locale] || !String(node[locale]).trim()
      );
      if (missing.length > 0) {
        out.push({ path, sourceText: node.en, missing });
      }
      return; // не углубляемся внутрь самого locale-объекта
    }
    for (const key of Object.keys(node)) {
      if (key.startsWith("_")) continue;
      collectLocaleFields(node[key], path ? `${path}.${key}` : key, out);
    }
  }
}

async function run() {
  console.log(
    `Ищу документы типов: ${DOC_TYPES.join(", ")} (только опубликованные)...`
  );

  const docs = await client.fetch(
    `*[_type in $types && !(_id in path("drafts.**"))]`,
    { types: DOC_TYPES }
  );

  console.log(`Найдено документов: ${docs.length}`);
  if (DRY_RUN)
    console.log("Режим DRY RUN — запись в Sanity выполняться не будет.\n");

  // Шаг 1 — собрать ВСЕ задания на перевод по всем документам, без вызова DeepL.
  // job = { docId, path, sourceText, locale }
  const jobs = [];
  const fieldsByDoc = new Map(); // docId -> количество полей (для лога)

  for (const doc of docs) {
    const fields = [];
    collectLocaleFields(doc, "", fields);
    if (fields.length === 0) continue;
    fieldsByDoc.set(doc._id, fields.length);
    for (const field of fields) {
      for (const locale of field.missing) {
        jobs.push({
          docId: doc._id,
          docType: doc._type,
          path: field.path,
          sourceText: field.sourceText,
          locale,
        });
      }
    }
  }

  console.log(
    `Документов с пропущенными переводами: ${fieldsByDoc.size}, полей: ${[
      ...fieldsByDoc.values(),
    ].reduce((a, b) => a + b, 0)}, отдельных переводов к выполнению: ${
      jobs.length
    }`
  );

  // Шаг 2 — сгруппировать задания по целевому языку и перевести батчами.
  let totalTranslations = 0;
  let totalErrors = 0;
  const results = []; // { docId, path, locale, translated }

  for (const locale of Object.keys(TARGET_LOCALES)) {
    const localeJobs = jobs.filter((j) => j.locale === locale);
    if (localeJobs.length === 0) continue;

    console.log(`\n== Язык ${locale.toUpperCase()}: ${localeJobs.length} текстов ==`);

    for (const batch of chunk(localeJobs, BATCH_SIZE)) {
      try {
        const translations = await deeplTranslateBatch(
          batch.map((j) => j.sourceText),
          TARGET_LOCALES[locale]
        );
        batch.forEach((job, i) => {
          const translated = translations[i];
          if (translated) {
            results.push({ ...job, translated });
            totalTranslations++;
            console.log(
              `  [${job.docType}/${job.docId}] ${job.path}.${locale} ← "${translated.slice(
                0,
                60
              )}${translated.length > 60 ? "…" : ""}"`
            );
          }
        });
      } catch (err) {
        totalErrors += batch.length;
        console.error(`  Ошибка батча (${batch.length} текстов):`, err.message);
      }
      await sleep(DELAY_BETWEEN_BATCHES_MS);
    }
  }

  // Шаг 3 — сгруппировать результаты по документу и запатчить одним commit на документ.
  if (!DRY_RUN) {
    const byDoc = new Map();
    for (const r of results) {
      if (!byDoc.has(r.docId)) byDoc.set(r.docId, []);
      byDoc.get(r.docId).push(r);
    }

    for (const [docId, docResults] of byDoc.entries()) {
      let patch = client.patch(docId);
      for (const r of docResults) {
        patch = patch.set({ [`${r.path}.${r.locale}`]: r.translated });
      }
      await patch.commit({ autoGenerateArrayKeys: true });
      console.log(`Сохранено: ${docId} (${docResults.length} полей)`);
    }
  }

  console.log(
    `\nГотово. Переводов выполнено: ${totalTranslations}, ошибок: ${totalErrors}.`
  );
  if (DRY_RUN) console.log("Это был DRY RUN — ничего не записано в Sanity.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
