import Link from "next/link";
import { localizedPath, type Locale } from "@/i18n";
import { CASE_LABELS, resolveText, type CaseContent, type KitPart } from "@/lib/case-content";
import { getEquipmentBySlug } from "@/lib/content";
import { SEO_LABELS } from "@/lib/seo-copy";
import { TEAM } from "@/lib/team";

const label = (key: string, locale: Locale) => CASE_LABELS[key][locale];

const HEADER_KEYS = ["project", "format", "venue", "dates", "client", "crew", "date"] as const;
const SUMMARY_KEYS = ["project", "format", "venue", "dates", "crew"] as const;

function FieldRows({ content, locale, keys }: { content: CaseContent; locale: Locale; keys: readonly (typeof HEADER_KEYS[number])[] }) {
  const { header } = content;
  return <>{keys.map((key) => {
    const value = header[key];
    return value ? <div key={key} className="flex flex-wrap gap-x-3">
      <dt className="text-surface-muted">{label(key, locale)}:</dt>
      <dd className="text-white">{resolveText(value, locale)}</dd>
    </div> : null;
  })}</>;
}

export function CaseHeader({ content, locale }: { content: CaseContent; locale: Locale }) {
  const { header } = content;
  const members = (header.team ?? []).map((slug) => TEAM.find((member) => member.slug === slug)).filter((member) => member !== undefined);
  const list = (items: string[]) => <ul className="list-disc space-y-1 pl-5">{items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
  return <section className="mt-10 max-w-3xl">
    <h2 className="text-2xl font-semibold text-white">{label("project", locale)}</h2>
    <dl className="mt-4 space-y-2 font-mono text-sm">
      <FieldRows content={content} locale={locale} keys={HEADER_KEYS} />
      {members.length > 0 && <div className="flex flex-wrap gap-x-3">
        <dt className="text-surface-muted">{label("team", locale)}:</dt>
        <dd className="text-white">{members.map((member, i) => <span key={member.slug}>
          {i > 0 && ", "}
          <Link href={`${localizedPath(locale, "/team")}#${member.slug}`} className="text-waveform-cyan hover:underline">{member.name}</Link>
        </span>)}</dd>
      </div>}
      {header.scope && <div className="flex flex-wrap gap-x-3">
        <dt className="text-surface-muted">{label("scope", locale)}:</dt>
        <dd className="text-white">{list(header.scope.map((item) => resolveText(item, locale)))}</dd>
      </div>}
      {header.deliverables && <div className="flex flex-wrap gap-x-3">
        <dt className="text-surface-muted">{label("deliverables", locale)}:</dt>
        <dd className="text-white">
          {list(header.deliverables.map((item) => resolveText(item, locale)))}
          {header.deliverablesNote && <p className="mt-2 text-surface-muted">({resolveText(header.deliverablesNote, locale)})</p>}
        </dd>
      </div>}
    </dl>
  </section>;
}

async function KitItem({ parts, locale, linked }: { parts: KitPart[]; locale: Locale; linked: Set<string> }) {
  const nodes = await Promise.all(parts.map(async (part, i) => {
    if (typeof part === "object" && "link" in part) return <Link key={i} href={localizedPath(locale, part.link)} className="text-waveform-cyan hover:underline">{resolveText(part.text, locale)}</Link>;
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
    {content.summaryFromHeader && <section className="mt-10">
      <h2 className={h2}>{label("summary", locale)}</h2>
      <dl className="mt-3 space-y-2 font-mono text-sm"><FieldRows content={content} locale={locale} keys={SUMMARY_KEYS} /></dl>
      <Link href={localizedPath(locale, "/contact")} className="mt-6 inline-flex bg-waveform-cyan px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black">{quoteLabel}</Link>
    </section>}
    {content.plainRelated && <section className="mt-12 border-t border-surface-border pt-6">
      <h2 className={h2}>{SEO_LABELS[locale].relatedServices}</h2>
      <ul className="mt-3 list-disc space-y-1 pl-6 text-surface-muted">
        {([["/services", SEO_LABELS[locale].serviceNames.live], ["/ob-van", SEO_LABELS[locale].serviceNames.obVan], ["/video-production", SEO_LABELS[locale].serviceNames.video]] as const).map(([path, name]) => <li key={path}><Link href={localizedPath(locale, path)} className="text-waveform-cyan hover:underline">{name}</Link></li>)}
      </ul>
    </section>}
    {content.narrative && <section className="mt-10">
      <h2 className={h2}>{label("summary", locale)}</h2>
      <p className="mt-3 text-lg leading-8 text-surface-muted">{resolveText(content.narrative, locale)}</p>
    </section>}
  </div>;
}
