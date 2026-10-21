import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getEquipment, getEquipmentBySlug } from "@/lib/content";
import { FLEET_COPY, isCapabilityGroup } from "@/lib/capability-groups";
import { relatedEquipment } from "@/lib/equipment-links";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { SEO_LABELS } from "@/lib/seo-copy";
import { imageUrlFor, localized } from "@/lib/sanity";
import { localizedPath, locales, type Locale } from "@/i18n";

export const revalidate = 60;

function shortName(item: { seoName?: string; name: Record<string, string> }, groupShort: string) {
  const original = item.seoName || item.name.en || "";
  const suffix = ` | ${groupShort} | Poerator`;
  const encodedLength = (value: string) => value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .length;
  const characters = Array.from(original);
  while (characters.length && encodedLength(`${characters.join("")}${suffix}`) > 60) characters.pop();
  const shortened = characters.join("").trimEnd();
  if (shortened === original) return original;
  while (characters.length && encodedLength(`${characters.join("").trimEnd()}…${suffix}`) > 60) characters.pop();
  return `${characters.join("").trimEnd()}…`;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string; category: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug, category } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) return {};
  const item = await getEquipmentBySlug(slug);
  if (!item || item.category?.slug !== category) return {};
  if (!isCapabilityGroup(item.capabilityGroup)) throw new Error(`Equipment "${item.slug}" has no valid capability group`);
  const group = FLEET_COPY[locale].groups[item.capabilityGroup];
  const name = shortName(item, group.short);
  const type = localized(item.shortDescription, locale);
  const description = locale === "en"
    ? `${name}: ${type}. Capability: ${group.application}. Part of the Poerator equipment fleet.`
    : `${name}: ${type}. ${FLEET_COPY[locale].capability}: ${group.application}. Poerator.`;
  return pageMetadata({
    locale,
    path: `/equipment/${category}/${slug}`,
    title: `${name} | ${group.short}`,
    description,
  });
}

export default async function EquipmentDetailPage({ params }: { params: Promise<{ locale: string; category: string; slug: string }> }) {
  const { locale: localeParam, category: categorySlug, slug } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const [item, allItems, common] = await Promise.all([
    getEquipmentBySlug(slug),
    getEquipment(),
    getTranslations({ locale, namespace: "common" }),
  ]);
  if (!item || (item.category?.slug && item.category.slug !== categorySlug)) notFound();
  if (!isCapabilityGroup(item.capabilityGroup)) throw new Error(`Equipment "${item.slug}" has no valid capability group`);
  const group = FLEET_COPY[locale].groups[item.capabilityGroup];
  const firstImage = item.gallery?.[0];
  const image = firstImage?.asset ? imageUrlFor(firstImage).width(1100).url() : "";
  const equipmentPath = `/equipment/${categorySlug}/${slug}`;
  const label = SEO_LABELS[locale].breadcrumb;
  const breadcrumb = breadcrumbJsonLd(locale, equipmentPath, (path) => {
    if (path === "/") return label.home;
    if (path === "/equipment") return label.equipment;
    if (path === `/equipment/${categorySlug}`) return localized(item.category?.title, locale);
    if (path === equipmentPath) return localized(item.name, locale) || item.name.en;
    throw new Error(`Unknown equipment breadcrumb path: ${path}`);
  });
  const related = relatedEquipment(item, allItems);
  const minimumRelated = 3;
  if (related.length < minimumRelated || related.length > 6) {
    throw new Error(`Equipment "${item.slug}" has ${related.length} related items; expected ${minimumRelated}-6`);
  }

  return <Section><Container>
    <JsonLd data={breadcrumb} />
    <Link href={localizedPath(locale, `/equipment/${categorySlug}`)} className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">← {localized(item.category?.title, locale)}</Link>
    <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative aspect-[4/3] overflow-hidden border border-surface-border bg-legal-black-panel">
        {image ? <Image src={image} alt={item.name.en} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain p-8" /> : <div className="flex h-full items-center justify-center p-8 text-center text-2xl font-semibold text-surface-muted">{item.name.en}</div>}
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-surface-muted">{localized(item.category?.title, locale)}</p>
        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">{item.name.en}</h1>
        <dl className="mt-6 space-y-3 text-sm leading-6">
          <div><dt className="inline text-surface-muted">{FLEET_COPY[locale].description}: </dt><dd className="inline text-white">{localized(item.shortDescription, locale)}</dd></div>
          <div><dt className="inline text-surface-muted">{FLEET_COPY[locale].capability}: </dt><dd className="inline text-white">{group.title}</dd></div>
          <div><dt className="inline text-surface-muted">{FLEET_COPY[locale].application}: </dt><dd className="inline text-white">{group.application}</dd></div>
          <div><dt className="inline text-surface-muted">{FLEET_COPY[locale].citiesServed}: </dt><dd className="inline text-white">{item.availableCities?.join(", ")}</dd></div>
        </dl>
        <Link href={localizedPath(locale, "/contact")} className="mt-8 inline-block bg-waveform-cyan px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black">{FLEET_COPY[locale].requestQuote}</Link>
      </div>
    </div>

    {!!item.kitIncludes?.length && <div className="mt-14"><h2 className="text-2xl font-semibold text-white">{common("kitIncludes")}</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{item.kitIncludes.map((entry, index) => <li key={index} className="border border-surface-border px-4 py-3 text-sm text-surface-muted">{localized(entry, locale)}</li>)}</ul></div>}
    <section className="mt-14">
      <h2 className="text-2xl font-semibold text-white">{FLEET_COPY[locale].relatedKit}</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {related.map(({ item: target, anchor }) => <li key={target._id}>
          <Link href={localizedPath(locale, `/equipment/${target.category?.slug}/${target.slug}`)} className="block h-full border border-surface-border bg-legal-black-panel p-4 text-sm text-waveform-cyan transition hover:border-waveform-cyan/60 hover:underline">
            {anchor || localized(target.name, locale) || target.name.en}
          </Link>
        </li>)}
      </ul>
    </section>
  </Container></Section>;
}
