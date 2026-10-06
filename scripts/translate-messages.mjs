import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const locales = ["de", "fr", "pl", "lt"];
const languageCodes = { de: "DE", fr: "FR", pl: "PL", lt: "LT" };
const apiKey = process.env.DEEPL_API_KEY;

if (!apiKey) throw new Error("DEEPL_API_KEY is required.");

const source = JSON.parse(await readFile(path.join(root, "messages/en.json"), "utf8"));

function flatten(value, prefix = [], result = []) {
  for (const [key, entry] of Object.entries(value)) {
    if (entry && typeof entry === "object" && !Array.isArray(entry)) flatten(entry, [...prefix, key], result);
    else if (typeof entry === "string") result.push({ path: [...prefix, key], value: entry });
  }
  return result;
}

function setPath(target, keys, value) {
  let cursor = target;
  for (const key of keys.slice(0, -1)) cursor = cursor[key] ||= {};
  cursor[keys.at(-1)] = value;
}

for (const locale of locales) {
  const file = path.join(root, "messages", `${locale}.json`);
  const target = JSON.parse(await readFile(file, "utf8"));
  const missing = flatten(source).filter(({ path: keys }) => {
    let value = target;
    for (const key of keys) value = value?.[key];
    return typeof value !== "string" || value.trim() === "";
  });

  if (!missing.length) {
    console.info(`${locale}: no missing message keys`);
    continue;
  }

  const host = apiKey.endsWith(":fx") ? "https://api-free.deepl.com" : "https://api.deepl.com";
  const response = await fetch(`${host}/v2/translate`, {
    method: "POST",
    headers: { Authorization: `DeepL-Auth-Key ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      text: missing.map(({ value }) => value),
      source_lang: "EN",
      target_lang: languageCodes[locale],
      preserve_formatting: true,
    }),
  });
  if (!response.ok) {
    throw new Error(`DeepL translation failed for ${locale} with HTTP ${response.status}: ${await response.text()}`);
  }
  const payload = await response.json();
  if (!Array.isArray(payload.translations) || payload.translations.length !== missing.length) {
    throw new Error(`DeepL returned an unexpected translation count for ${locale}.`);
  }
  missing.forEach(({ path: keys }, index) => setPath(target, keys, payload.translations[index].text));
  await writeFile(file, `${JSON.stringify(target, null, 2)}\n`);
  console.info(`${locale}: translated ${missing.length} message keys`);
}
