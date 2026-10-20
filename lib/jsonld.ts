import { absoluteUrl, SITE_URL } from "@/lib/seo";
import type { Locale } from "@/i18n";

const CITIES = [
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
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Poerator",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-white.png`,
  email: "hey@poerator.com",
  telephone: "+370 672 78991",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vilnius",
    addressCountry: "LT",
  },
  sameAs: [
    "https://www.instagram.com/poerator_lab/",
    "https://www.linkedin.com/company/108798958",
  ],
  areaServed: CITIES.map((name) => ({ "@type": "City", name })),
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
    provider: { "@id": ORGANIZATION_ID },
    areaServed: CITIES.map((name) => ({ "@type": "City", name })),
  };
}

export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

export function collectionPageJsonLd(options: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.locale, options.path),
    isPartOf: { "@id": ORGANIZATION_ID },
  };
}

export function equipmentJsonLd(options: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  brand?: string;
  category: string;
  image?: string;
  sku: string;
  dailyRate?: number;
}) {
  const url = absoluteUrl(options.locale, options.path);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: options.name,
    description: options.description,
    sku: options.sku,
    category: options.category,
    url,
    ...(options.brand ? { brand: { "@type": "Brand", name: options.brand } } : {}),
    ...(options.image ? { image: options.image } : {}),
    ...(options.dailyRate != null
      ? {
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: "EUR",
            price: options.dailyRate,
            availability: "https://schema.org/InStock",
            businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
            seller: { "@id": ORGANIZATION_ID },
            areaServed: CITIES.map((name) => ({ "@type": "City", name })),
          },
        }
      : {}),
  };
}
