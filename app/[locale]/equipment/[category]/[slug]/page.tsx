import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HUB_CITIES } from "@/lib/constants";
import { getEquipmentBySlug } from "@/lib/content";
import { breadcrumbJsonLd, equipmentJsonLd } from "@/lib/jsonld";
import { pageAlternates } from "@/lib/seo";
import { imageUrlFor, localized } from "@/lib/sanity";
import { localizedPath, locales, type Locale } from "@/i18n";

export const revalidate = 60;

function truncateSeoName(name: string) {
  return name.length > 35 ? name.slice(0, 35).trim() : name;
}

function normalizeType(raw: string) {
  return raw.trim().replace(/[.!?\s]+$/, "");
}

function parseDailyRate(value?: string) {
  if (!value) return undefined;
  const cleaned = value.replace(",", ".").match(/\d+(\.\d+)?/);
  if (!cleaned) return undefined;
  const parsed = Number(cleaned[0]);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function inferBrand(name: string) {
  const value = name.toLowerCase();
  if (value.startsWith("blackmagic") || value.startsWith("decklink")) return "Blackmagic Design";
  if (value.startsWith("dji")) return "DJI";
  if (value.startsWith("accsoon")) return "Accsoon";
  if (value.startsWith("amaran")) return "Amaran";
  if (value.startsWith("fujinon")) return "Fujinon";
  return undefined;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string; category: string }> }): Promise<Metadata> {
  const { locale, slug, category } = await params;
  const localeCode = locale as Locale;
  if (!locales.includes(localeCode)) return {};
  const [item, card] = await Promise.all([
    getEquipmentBySlug(slug),
    getTranslations({ locale, namespace: "equipmentCard" }),
  ]);
  if (!item || (item.category?.slug && item.category.slug !== category)) return {};
  const shortName = truncateSeoName(item.seoName || item.name.en || "");
  const itemType = normalizeType(localized(item.shortDescription, localeCode) || card("defaultType"));
  return {
    title: card("seoTitle", { shortName }),
    description: card("seoDescription", {
      shortName,
      type: itemType,
      cities: HUB_CITIES.join(", "),
    }),
    alternates: pageAlternates(localeCode, `/equipment/${category}/${slug}`),
  };
}

export default async function EquipmentDetailPage({ params }: { params: Promise<{ locale: string; category: string; slug: string }> }) {
  const { locale: localeParam, category: categorySlug, slug } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const [item, t, common, card] = await Promise.all([
    getEquipmentBySlug(slug),
    getTranslations({ locale, namespace: "equipmentPage" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "equipmentCard" }),
  ]);
  if (!item || (item.category?.slug && item.category.slug !== categorySlug)) notFound();
  const firstImage = item.gallery?.[0];
  const image = firstImage?.asset ? imageUrlFor(firstImage).width(1100).url() : "";
  const descriptionType = normalizeType(localized(item.shortDescription, locale) || card("defaultType"));
  const jsonLdDescription = `${descriptionType}. ${card("dryHireValue")}. ${card("delivery.value")}.`;
  const equipmentPath = `/equipment/${categorySlug}/${slug}`;
  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: "Home", path: "/" },
    { name: t("title"), path: "/equipment" },
    { name: localized(item.category?.title, locale) || "", path: `/equipment/${categorySlug}` },
    { name: item.name.en, path: equipmentPath },
  ]);
  const product = equipmentJsonLd({
    locale,
    path: equipmentPath,
    name: item.name.en,
    description: jsonLdDescription,
    brand: inferBrand(item.name.en),
    category: localized(item.category?.title, locale) || item.category?.slug || "",
    image,
    sku: item.slug,
    dailyRate: parseDailyRate(item.dailyRate),
  });
  const optionalTerms: Array<[string, string]> = [
    item.dailyRate ? [card("dailyRate.label"), item.dailyRate] : null,
    item.deposit ? [card("deposit.label"), item.deposit] : null,
    localized(item.minHirePeriod, locale) ? [card("minimumHirePeriod.label"), localized(item.minHirePeriod, locale)] : null,
    localized(item.insurance, locale) ? [card("insurance.label"), localized(item.insurance, locale)] : null,
  ].filter(Boolean) as Array<[string, string]>;

  return <Section><Container>
    <JsonLd data={breadcrumb} />
    <JsonLd data={product} />
    <Link href={localizedPath(locale, `/equipment/${categorySlug}`)} className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">← {localized(item.category?.title, locale) || t("title")}</Link>
    <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative aspect-[4/3] overflow-hidden border border-surface-border bg-legal-black-panel">
        {image ? <Image src={image} alt={item.name.en} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain p-8" /> : <div className="flex h-full items-center justify-center p-8 text-center text-2xl font-semibold text-surface-muted">{item.name.en}</div>}
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-surface-muted">{localized(item.category?.title, locale)}</p>
        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">{item.name.en}</h1>
        <p className="mt-5 leading-7 text-surface-muted">{localized(item.shortDescription, locale)}</p>
        <p className="mt-6 text-sm text-surface-muted">{common("quantity")}: <span className="text-white">{item.quantityAvailable ?? "—"}</span></p>
        <p className="mt-3 text-sm text-surface-muted">{common("availableIn")}: <span className="text-white">{item.availableCities?.join(", ")}</span></p>
        <p className="mt-3 text-sm text-surface-muted">{common("hireTypes")}: <span className="text-white">{item.hireTypes?.join(", ")}</span></p>
        <Link href={localizedPath(locale, "/contact")} className="mt-8 inline-block bg-waveform-cyan px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black">{common("requestQuote")}</Link>
      </div>
    </div>

    <section className="mt-12 border border-surface-border bg-legal-black-panel p-6">
      <h2 className="text-2xl font-semibold text-white">{card("hireTermsTitle")}</h2>
      <dl className="mt-4 space-y-2 font-mono text-sm">
        <div className="flex flex-wrap gap-x-3">
          <dt className="text-surface-muted">{card("delivery.label")}:</dt>
          <dd className="text-white">{card("delivery.value")}</dd>
        </div>
        {optionalTerms.map(([label, value]) => (
          <div key={label} className="flex flex-wrap gap-x-3">
            <dt className="text-surface-muted">{label}:</dt>
            <dd className="text-white">{value}</dd>
          </div>
        ))}
        <div className="flex flex-wrap gap-x-3">
          <dt className="text-surface-muted">{card("category.label")}:</dt>
          <dd><Link href={localizedPath(locale, `/equipment/${categorySlug}`)} className="text-waveform-cyan">{localized(item.category?.title, locale) || categorySlug}</Link></dd>
        </div>
      </dl>
      <Link href={localizedPath(locale, "/contact")} className="mt-6 inline-block bg-waveform-cyan px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black">{common("requestQuote")}</Link>
    </section>

    {!!item.kitIncludes?.length && <div className="mt-14"><h2 className="text-2xl font-semibold text-white">{common("kitIncludes")}</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{item.kitIncludes.map((entry, i) => <li key={i} className="border border-surface-border px-4 py-3 text-sm text-surface-muted">{localized(entry, locale)}</li>)}</ul></div>}
    {!!item.specifications?.length && <div className="mt-14"><h2 className="text-2xl font-semibold text-white">{common("specifications")}</h2><dl className="mt-5 divide-y divide-surface-border border-y border-surface-border">{item.specifications.map((entry, i) => <div key={i} className="grid grid-cols-2 gap-4 py-4 text-sm"><dt className="text-surface-muted">{localized(entry.label, locale)}</dt><dd className="text-white">{localized(entry.value, locale)}</dd></div>)}</dl></div>}
  </Container></Section>;
}
