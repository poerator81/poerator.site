import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EquipmentCatalog } from "@/components/equipment/EquipmentCatalog";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCategories, getEquipment } from "@/lib/content";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/jsonld";
import { pageAlternates } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getTranslations({ locale, namespace: "equipmentHire.seo" });
  return { title: seo("title"), description: seo("description"), alternates: pageAlternates(locale as Locale, "/equipment") };
}

export default async function EquipmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const [t, common, hire, seo, items, categories] = await Promise.all([
    getTranslations({ locale, namespace: "equipmentPage" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "equipmentHire.terms" }),
    getTranslations({ locale, namespace: "equipmentHire.seo" }),
    getEquipment(),
    getCategories(),
  ]);
  const jsonLd = [
    collectionPageJsonLd({ locale, path: "/equipment", name: seo("title"), description: seo("description") }),
    breadcrumbJsonLd(locale, [{ name: "Home", path: "/" }, { name: seo("title"), path: "/equipment" }]),
  ];
  return <Section><Container>
    {jsonLd.map((data, index) => <JsonLd key={index} data={data} />)}
    <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">Poerator / Equipment</p>
    <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">{t("title")}</h1>
    <p className="mt-5 max-w-3xl text-lg leading-8 text-surface-muted">{t("intro")}</p>
    <EquipmentCatalog items={items} categories={categories} locale={locale} detailsLabel={t("details")} hireTerms={{
      title: hire("title"),
      fields: [
        [hire("hireTypes.label"), hire("hireTypes.value")],
        [hire("dryHire.label"), hire("dryHire.value")],
        [hire("fullCrew.label"), hire("fullCrew.value")],
        [hire("delivery.label"), hire("delivery.value")],
        [hire("hubs.label"), hire("hubs.value")],
      ],
      quoteText: hire("requestQuote"),
    }} labels={{
      search: common("search"),
      city: common("city"),
      allCities: common("allCities"),
      category: common("category"),
      allCategories: common("allCategories"),
      noResults: common("noResults"),
      availableIn: common("availableIn"),
    }} />
  </Container></Section>;
}
