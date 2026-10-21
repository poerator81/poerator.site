import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EquipmentCatalog } from "@/components/equipment/EquipmentCatalog";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCategories, getCases, getEquipment } from "@/lib/content";
import { CAPABILITY_GROUPS, FLEET_COPY, GROUP_ORDER, isCapabilityGroup } from "@/lib/capability-groups";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { HUB_CITIES } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import { SEO_LABELS } from "@/lib/seo-copy";
import { localizedPath, locales, type Locale } from "@/i18n";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) return {};
  const items = await getEquipment();
  const copy = FLEET_COPY[locale];
  return pageMetadata({
    locale,
    path: "/equipment",
    title: copy.metaTitle,
    description: copy.seoDescription(items.length, CAPABILITY_GROUPS.length),
  });
}

export default async function EquipmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const [common, items, categories, cases] = await Promise.all([
    getTranslations({ locale, namespace: "common" }),
    getEquipment(),
    getCategories(),
    getCases(),
  ]);
  const copy = FLEET_COPY[locale];
  const groupCopy = copy.groups;
  const groups = CAPABILITY_GROUPS.map((key) => ({
    key,
    title: groupCopy[key].title,
    application: groupCopy[key].application,
    items: items.filter((item) => {
      if (!isCapabilityGroup(item.capabilityGroup)) {
        throw new Error(`Equipment "${item.slug}" has no valid capability group`);
      }
      return item.capabilityGroup === key;
    }),
  }));
  const orderedItems = [...items].sort((a, b) => {
    const aGroup = a.capabilityGroup;
    const bGroup = b.capabilityGroup;
    if (!isCapabilityGroup(aGroup) || !isCapabilityGroup(bGroup)) {
      throw new Error("Every equipment record must have a valid capability group");
    }
    return (GROUP_ORDER.get(aGroup)! - GROUP_ORDER.get(bGroup)!) || a.name.en.localeCompare(b.name.en);
  });
  const projectTypes = ["sports", "esports", "broadcast", "corporate"].filter((type) =>
    cases.some((item) => item.projectType?.toLowerCase() === type),
  );
  const copyLabels = SEO_LABELS[locale].breadcrumb;
  const breadcrumb = breadcrumbJsonLd(locale, "/equipment", (path) =>
    path === "/" ? copyLabels.home : copyLabels.equipment,
  );
  const itemList = itemListJsonLd({
    locale,
    items: orderedItems.map((item) => {
      if (!item.category?.slug) throw new Error(`Equipment "${item.slug}" has no category slug`);
      return { category: item.category.slug, slug: item.slug };
    }),
  });
  const supportedServices = [
    { path: "/ob-van", label: SEO_LABELS[locale].serviceNames.obVan },
    { path: "/services", label: SEO_LABELS[locale].serviceNames.live },
    { path: "/video-production", label: SEO_LABELS[locale].serviceNames.video },
  ];

  return <Section><Container>
    <JsonLd data={itemList} />
    <JsonLd data={breadcrumb} />
    <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">Poerator / Equipment</p>
    <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">{copy.title}</h1>
    <dl className="mt-7 grid gap-x-8 gap-y-3 border-y border-surface-border py-5 text-sm md:grid-cols-2">
      <div><dt className="inline text-surface-muted">{copy.purposeLabel}: </dt><dd className="inline text-white">{copy.purpose}</dd></div>
      <div><dt className="inline text-surface-muted">{copy.catalogLabel}: </dt><dd className="inline text-white">{items.length} {copy.catalog}</dd></div>
      <div><dt className="inline text-surface-muted">{copy.capabilityGroups}: </dt><dd className="inline text-white">{groups.length}</dd></div>
      <div><dt className="inline text-surface-muted">{copy.projectTypes}: </dt><dd className="inline text-white">{projectTypes.join(", ")}</dd></div>
      <div className="md:col-span-2"><dt className="inline text-surface-muted">{copy.citiesServed}: </dt><dd className="inline text-white">{HUB_CITIES.join(", ")}</dd></div>
      <div className="md:col-span-2">
        <dt className="inline text-surface-muted">{copy.supports}: </dt>
        <dd className="inline text-white">{supportedServices.map((service, index) => <span key={service.path}>
          {index > 0 && ", "}
          <Link href={localizedPath(locale, service.path)} className="text-waveform-cyan hover:underline">{service.label}</Link>
        </span>)}</dd>
      </div>
    </dl>
    <Link href={localizedPath(locale, "/contact")} className="mt-6 inline-flex bg-waveform-cyan px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black">{copy.requestQuote}</Link>
    <EquipmentCatalog items={items} categories={categories} groups={groups} locale={locale} labels={{
      search: common("search"),
      city: common("city"),
      allCities: common("allCities"),
      category: common("category"),
      allCategories: common("allCategories"),
      noResults: copy.noResults,
      availableIn: copy.citiesServed,
      details: copy.details,
      application: copy.application,
      type: copy.type,
    }} />
  </Container></Section>;
}
