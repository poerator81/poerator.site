import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getEquipmentBySlug } from "@/lib/content";
import {
  DELIVERY_DAYS, findGeoCity, GEO_CITIES, GEO_EQUIPMENT, GEO_LABELS, hireAnchor, RELATED_EQUIPMENT,
} from "@/lib/geo-pages";
import { CITIES, ORG_ID } from "@/lib/jsonld";
import { absoluteUrl, HREFLANG, pageAlternates } from "@/lib/seo";
import { SEO_LABELS } from "@/lib/seo-copy";
import { localized, sanityClient } from "@/lib/sanity";
import { localizedPath, locales, type Locale } from "@/i18n";

export const revalidate = 60;

type Params = { locale: string; geoSlug: string };
const label = (key: string, locale: Locale) => GEO_LABELS[key][locale];
const capitalise = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

type EquipmentData = {
  hireTypes?: string[];
  quantityAvailable?: number;
  kitIncludes?: Record<string, string>[];
  availableCities?: string[];
};

const fetchEquipment = () => sanityClient.fetch<EquipmentData | null>(
  `*[_type == "equipment" && _id == $id][0]{ hireTypes, quantityAvailable, kitIncludes, availableCities }`,
  { id: GEO_EQUIPMENT.id },
  { next: { revalidate } },
);

function resolve(params: Params) {
  const locale = params.locale as Locale;
  const page = findGeoCity(params.geoSlug);
  if (!locales.includes(locale) || !page || !page.locales.includes(locale)) return null;
  return { locale, page };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const found = resolve(await params);
  if (!found) return {};
  const { locale, page } = found;
  const path = `/${page.slug}`;
  const title = page.title[locale]!;
  const description = page.meta[locale]!;
  const alternates = page.locales.length === locales.length
    ? pageAlternates(locale, path)
    : { canonical: absoluteUrl(locale, path), languages: { [HREFLANG[locale]]: absoluteUrl(locale, path) } };
  return {
    title: { absolute: title },
    description,
    alternates,
    openGraph: { title, description, url: absoluteUrl(locale, path), siteName: "Poerator", locale },
  };
}

function Row({ name, children }: { name: string; children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-x-3">
    <dt className="text-surface-muted">{name}:</dt>
    <dd className="text-white">{children}</dd>
  </div>;
}

export default async function GeoLandingPage({ params }: { params: Promise<Params> }) {
  const found = resolve(await params);
  if (!found) notFound();
  const { locale, page } = found;
  setRequestLocale(locale);
  const [equipment, nav, related] = await Promise.all([
    fetchEquipment(),
    getTranslations({ locale, namespace: "nav" }),
    Promise.all(RELATED_EQUIPMENT.map(async (target) => {
      const item = await getEquipmentBySlug(target.slug);
      const name = item?.seoName || item?.name.en;
      if (!name) throw new Error(`Equipment "${target.slug}" for the city page was not found`);
      return { ...target, name };
    })),
  ]);
  if (!equipment) notFound();

  const path = `/${page.slug}`;
  const url = absoluteUrl(locale, path);
  const h1 = page.h1[locale]!;
  const crumbs = SEO_LABELS[locale].breadcrumb;
  const cardPath = `/equipment/${GEO_EQUIPMENT.category}/${GEO_EQUIPMENT.slug}`;
  const breadcrumbs = [
    { name: crumbs.home, path: "/" },
    { name: crumbs.equipment, path: "/equipment" },
    { name: GEO_EQUIPMENT.name, path: cardPath },
    { name: h1, path },
  ];
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: h1,
        serviceType: "Broadcast equipment hire",
        url,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "City", name: page.city },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: absoluteUrl(locale, crumb.path),
        })),
      },
    ],
  };

  const link = "text-waveform-cyan hover:underline";
  const kit = [label("cameraBody", locale), ...(equipment.kitIncludes ?? []).map((entry) => capitalise(localized(entry, locale)))];
  const hireTypes = (equipment.hireTypes ?? []).join(", ");
  const heading = "text-2xl font-semibold text-white";
  const hasUnits = typeof equipment.quantityAvailable === "number";

  return <Section><Container>
    <JsonLd data={graph} />
    <nav aria-label="Breadcrumb" className="font-mono text-xs text-surface-muted">
      {breadcrumbs.map((crumb, index) => <span key={crumb.path}>
        {index > 0 && " / "}
        {index < breadcrumbs.length - 1 ? <Link href={localizedPath(locale, crumb.path)} className={link}>{crumb.name}</Link> : crumb.name}
      </span>)}
    </nav>
    <p className="mt-6 font-mono text-xs uppercase tracking-widest text-waveform-cyan">Poerator / {page.eyebrow[locale]}</p>
    <h1 className="mt-4 max-w-5xl text-4xl font-bold text-white md:text-6xl">{h1}</h1>

    <section className="mt-12 max-w-3xl">
      <h2 className={heading}>{label("availability", locale)}</h2>
      <dl className="mt-4 space-y-2 font-mono text-sm">
        <Row name={label("equipment", locale)}>{GEO_EQUIPMENT.name}</Row>
        <Row name={label("city", locale)}>{page.city}</Row>
        {hireTypes && <Row name={label("hireTypes", locale)}>{hireTypes}</Row>}
        {hasUnits && <Row name={label("units", locale)}>{equipment.quantityAvailable}</Row>}
        <Row name={label("leadTime", locale)}>{label("leadTimeValue", locale)}</Row>
        <Row name={label("bookingWindow", locale)}>{label("bookingWindowValue", locale)}</Row>
        <Row name={label("minimumHire", locale)}>{label("minimumHireValue", locale)}</Row>
      </dl>
      <Link href={localizedPath(locale, "/contact")} className="mt-6 inline-flex bg-waveform-cyan px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black">{label("quote", locale)}</Link>
    </section>

    <section className="mt-12 max-w-3xl">
      <h2 className={heading}>{label("kitIncludes", locale)}</h2>
      <ul className="mt-4 list-disc space-y-1 pl-6 text-surface-muted">{kit.map((item) => <li key={item}>{item}</li>)}</ul>
      <Link href={localizedPath(locale, cardPath)} className={`mt-4 inline-block text-sm ${link}`}>{label("fullSpec", locale)}</Link>
    </section>

    <section className="mt-12 max-w-3xl">
      <h2 className={heading}>{label("hireTerms", locale)}</h2>
      <dl className="mt-4 space-y-2 font-mono text-sm">
        {hireTypes && <Row name={label("hireTypes", locale)}>{hireTypes}</Row>}
        <Row name={label("operator", locale)}>{label("no", locale)}</Row>
        <Row name={label("insurance", locale)}>{label("quotedSeparately", locale)}</Row>
        <Row name={label("deposit", locale)}>{label("individual", locale)}</Row>
      </dl>
    </section>

    <section className="mt-12 max-w-3xl">
      <h2 className={heading}>{label("coverageDelivery", locale)}</h2>
      <dl className="mt-4 space-y-2 font-mono text-sm">
        <Row name={label("coverage", locale)}>{page.city}</Row>
        <Row name={label("delivery", locale)}>{label("yes", locale)}</Row>
        <Row name={label("deliveryTime", locale)}>{DELIVERY_DAYS[page.deliveryTime][locale]}</Row>
        <Row name={label("collection", locale)}>{page.collection[locale]}</Row>
        <Row name={label("support", locale)}>{label("yes", locale)}</Row>
        <Row name={label("locations", locale)}>{CITIES.join(", ")}</Row>
      </dl>
    </section>

    <section className="mt-12 max-w-3xl">
      <h2 className={heading}>{label("relatedEquipment", locale)}</h2>
      <ul className="mt-4 list-disc space-y-1 pl-6 text-surface-muted">
        {related.map((item) => <li key={item.slug}><Link href={localizedPath(locale, `/equipment/${item.category}/${item.slug}`)} className={link}>{item.name}</Link></li>)}
      </ul>
    </section>

    <section className="mt-12 max-w-3xl">
      <h2 className={heading}>{label("relatedServices", locale)}</h2>
      <ul className="mt-4 list-disc space-y-1 pl-6 text-surface-muted">
        <li><Link href={localizedPath(locale, "/ob-van")} className={link}>{nav("obVan")}</Link></li>
        <li><Link href={localizedPath(locale, "/services")} className={link}>{nav("services")}</Link></li>
      </ul>
    </section>

    <section className="mt-12 max-w-3xl">
      <h2 className={heading}>{label("cities", locale)}</h2>
      <ul className="mt-4 list-disc space-y-1 pl-6 text-surface-muted">
        {CITIES.map((city) => {
          const target = GEO_CITIES.find((item) => item.city === city);
          if (!target || target.slug === page.slug) return <li key={city}>{city}</li>;
          const targetLocale = target.locales.includes(locale) ? locale : target.locales[0];
          return <li key={city}><Link href={localizedPath(targetLocale, `/${target.slug}`)} className={link}>{hireAnchor(locale, city)}</Link></li>;
        })}
      </ul>
    </section>
  </Container></Section>;
}
