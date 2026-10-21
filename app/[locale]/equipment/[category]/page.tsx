import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCategories, getEquipment } from "@/lib/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { localizedPath, locales, type Locale } from "@/i18n";
import { localized } from "@/lib/sanity";
import { pageMetadata } from "@/lib/seo";
import { SEO_LABELS } from "@/lib/seo-copy";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale: localeParam, category: categorySlug } = await params;
  const locale = localeParam as Locale;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === categorySlug);
  if (!category) return {};
  const title = localized(category.title, locale);
  return pageMetadata({
    locale,
    path: `/equipment/${categorySlug}`,
    title,
    description: `${title}. Equipment fleet and production capability.`,
  });
}

export default async function EquipmentCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale: localeParam, category: categorySlug } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const [categories, equipment, common] = await Promise.all([
    getCategories(),
    getEquipment(),
    getTranslations({ locale, namespace: "common" }),
  ]);
  const category = categories.find((item) => item.slug === categorySlug);
  if (!category) notFound();
  const items = equipment.filter((item) => item.category?.slug === category.slug);
  const categoryName = localized(category.title, locale);
  const labels = SEO_LABELS[locale].breadcrumb;
  const breadcrumb = breadcrumbJsonLd(locale, `/equipment/${categorySlug}`, (path) => {
    if (path === "/") return labels.home;
    if (path === "/equipment") return labels.equipment;
    if (path === `/equipment/${categorySlug}`) return categoryName;
    throw new Error(`Unknown equipment category breadcrumb path: ${path}`);
  });
  return <Section><Container>
    <JsonLd data={breadcrumb} />
    <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">{categoryName}</p>
    <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">{categoryName}</h1>
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => <Link key={item._id} href={localizedPath(locale, `/equipment/${category.slug}/${item.slug}`)} className="border border-surface-border bg-legal-black-panel p-6 transition hover:border-waveform-cyan/60">
        <h2 className="text-xl font-semibold text-white">{item.name.en}</h2>
        <p className="mt-3 text-sm leading-6 text-surface-muted">{localized(item.shortDescription, locale)}</p>
        <p className="mt-6 text-xs text-surface-muted">{common("availableIn")} {item.availableCities?.join(", ")}</p>
      </Link>)}
    </div>
  </Container></Section>;
}
