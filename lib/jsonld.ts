import { absoluteUrl, SITE_URL } from "@/lib/seo";
import type { Locale } from "@/i18n";

export const CITIES = [
  "Vilnius",
  "Riga",
  "Tallinn",
  "Warsaw",
  "Berlin",
  "Paris",
  "Belgrade",
  "London",
  "Brussels",
];
const city = (name: string) => ({ "@type": "City", name });
export const ORG_ID = `${SITE_URL}/#organization`;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Poerator",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-white.png`,
  areaServed: CITIES.map(city),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+370 672 78991",
    email: "hey@poerator.com",
  },
  sameAs: ["https://www.instagram.com/poerator_lab/", "https://www.linkedin.com/company/108798958"],
};

export function serviceJsonLd(options: {
  locale: Locale;
  path: string;
  name: string;
  serviceType: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    serviceType: options.serviceType,
    description: options.description,
    url: absoluteUrl(options.locale, options.path),
    provider: { "@id": ORG_ID },
    areaServed: CITIES.map(city),
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  path: string,
  labelFor: (segmentPath: string) => string,
) {
  const segments = path.split("/").filter(Boolean);
  const crumbs = [{ name: labelFor("/"), path: "/" }];
  let accumulated = "";
  for (const segment of segments) {
    accumulated += `/${segment}`;
    crumbs.push({ name: labelFor(accumulated), path: accumulated });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

export function itemListJsonLd(options: { locale: Locale; items: { category: string; slug: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Equipment fleet",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: options.items.length,
    itemListElement: options.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(options.locale, `/equipment/${item.category}/${item.slug}`),
    })),
  };
}
