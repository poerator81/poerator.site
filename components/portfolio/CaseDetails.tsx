import Link from "next/link";
import { localizedPath, type Locale } from "@/i18n";
import { CASE_LABELS, resolveText, type CaseContent, type KitPart } from "@/lib/case-content";
import { getEquipmentBySlug } from "@/lib/content";

const label = (key: string, locale: Locale) => CASE_LABELS[key][locale];

export function CaseHeader({ content, locale }: { content: CaseContent; locale: Locale }) {
  const { header } = content;
  const rows = (["project", "format", "venue", "crew", "date"] as const)
    .map((key) => [key, header[key]] as const)
    .filter((row): row is readonly [typeof row[0], NonNullable<typeof row[1]>] => Boolean(row[1]));
  return <section className="mt-10 max-w-3xl">
    <h2 className="text-2xl font-semibold text-white">{label("project", locale)}</h2>
    <dl className="mt-4 space-y-2 font-mono text-sm">
      {rows.map(([key, value]) => <div key={key} className="flex flex-wrap gap-x-3">
        <dt className="text-surface-muted">{label(key, locale)}:</dt>
        <dd className="text-white">{resolveText(value, locale)}</dd>
      </div>)}
    </dl>
  </section>;
}

async function KitItem({ parts, locale, linked }: { parts: KitPart[]; locale: Locale; linked: Set<string> }) {
  const nodes = await Promise.all(parts.map(async (part, i) => {
    if (typeof part === "string" || !("equipment" in part)) return resolveText(part, locale);
    const { category, slug } = part.equipment;
    const key = `${category}/${slug}`;
    const item = await getEquipmentBySlug(slug);
    const name = item?.seoName || item?.name.en;
    if (!item || !name) throw new Error(`Equipment "${slug}" referenced by a case study was not found`);
    if (linked.has(key)) return name;
    linked.add(key);
    return <Link key={i} href={localizedPath(locale, `/equipment/${category}/${slug}`)} className="text-waveform-cyan hover:underline">{name}</Link>;
  }));
  return <li>{nodes}</li>;
}

export async function CaseBody({ content, locale, quoteLabel }: { content: CaseContent; locale: Locale; quoteLabel: string }) {
  const linked = new Set<string>();
  const kit = content.kit ?? [];
  const constraints = content.constraints ?? [];
  const result = content.result ?? [];
  const h2 = "text-2xl font-semibold text-white";
  return <div className="max-w-3xl">
    {content.challenge && <section className="mt-10">
      <h2 className={h2}>{label("challenge", locale)}</h2>
      <p className="mt-3 text-lg leading-8 text-surface-muted">{resolveText(content.challenge, locale)}</p>
    </section>}
    {kit.length > 0 && <section className="mt-10">
      <h2 className={h2}>{label("kit", locale)}</h2>
      <ul className="mt-3 list-disc space-y-1 pl-6 text-surface-muted">
        {kit.map((parts, i) => <KitItem key={i} parts={parts} locale={locale} linked={linked} />)}
      </ul>
    </section>}
    {constraints.length > 0 && <section className="mt-10">
      <h2 className={h2}>{label("constraints", locale)}</h2>
      <ul className="mt-3 list-disc space-y-1 pl-6 text-surface-muted">
        {constraints.map((value, i) => <li key={i}>{resolveText(value, locale)}</li>)}
      </ul>
    </section>}
    {result.length > 0 && <section className="mt-10">
      <h2 className={h2}>{label("result", locale)}</h2>
      <dl className="mt-3 space-y-2 font-mono text-sm">
        {result.map((row) => <div key={row.label} className="flex flex-wrap gap-x-3">
          <dt className="text-surface-muted">{label(row.label, locale)}:</dt>
          <dd className="text-white">{resolveText(row.value, locale)}</dd>
        </div>)}
      </dl>
      <Link href={localizedPath(locale, "/contact")} className="mt-6 inline-flex bg-waveform-cyan px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black">{quoteLabel}</Link>
    </section>}
    {content.narrative && <section className="mt-10">
      <h2 className={h2}>{label("summary", locale)}</h2>
      <p className="mt-3 text-lg leading-8 text-surface-muted">{resolveText(content.narrative, locale)}</p>
    </section>}
  </div>;
}
