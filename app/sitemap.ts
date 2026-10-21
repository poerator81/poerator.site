import type { MetadataRoute } from "next";
import { locales, localizedPath, type Locale } from "@/i18n";
import { HREFLANG } from "@/lib/seo";
import { sanityClient } from "@/lib/sanity";

export const revalidate = 3600;

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://poerator.com").replace(/\/$/, "");
const STATIC_PATHS = [
  "",
  "/services",
  "/video-production",
  "/equipment",
  "/ob-van",
  "/portfolio",
  "/contact",
  "/privacy-policy",
];

type Slugs = {
  equipment: { slug: string; category: string; updated: string }[];
  categories: { slug: string; updated: string }[];
  cases: { slug: string; updated: string }[];
  geo: { slug: string; updated: string }[];
};

async function getSlugs(): Promise<Slugs> {
  return sanityClient.fetch<Slugs>(
    `{
      "equipment": *[_type == "equipment" && defined(slug.current) && defined(category->slug.current)]{
        "slug": slug.current, "category": category->slug.current, "updated": _updatedAt
      },
      "categories": *[_type == "category" && defined(slug.current)]{
        "slug": slug.current, "updated": _updatedAt
      },
      "cases": *[_type == "caseStudy" && defined(slug.current)]{
        "slug": slug.current, "updated": _updatedAt
      },
      "geo": *[_type == "geoLanding" && defined(slug.current) && slug.current != "ob-van-rental-berlin"]{
        "slug": slug.current, "updated": _updatedAt
      }
    }`,
    {},
    { next: { revalidate } },
  );
}

function entry(
  path: string,
  lastModified: Date,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
): MetadataRoute.Sitemap {
  const translatedUrls = Object.fromEntries(
    locales.map((locale: Locale) => [
      HREFLANG[locale],
      `${BASE}${localizedPath(locale, path)}`,
    ]),
  );
  const languages = {
    ...translatedUrls,
    "x-default": `${BASE}${localizedPath("en", path)}`,
  };

  return locales.map((locale: Locale) => ({
    url: `${BASE}${localizedPath(locale, path)}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getSlugs();
  const now = new Date();

  return [
    ...STATIC_PATHS.flatMap((path) =>
      entry(path, now, path === "" ? 1 : 0.8, "weekly"),
    ),
    ...slugs.categories.flatMap((category) =>
      entry(`/equipment/${category.slug}`, new Date(category.updated), 0.7, "weekly"),
    ),
    ...slugs.equipment.flatMap((item) =>
      entry(
        `/equipment/${item.category}/${item.slug}`,
        new Date(item.updated),
        0.6,
        "monthly",
      ),
    ),
    ...slugs.cases.flatMap((item) =>
      entry(`/portfolio/${item.slug}`, new Date(item.updated), 0.6, "monthly"),
    ),
    ...slugs.geo.flatMap((landing) =>
      entry(`/${landing.slug}`, new Date(landing.updated), 0.7, "monthly"),
    ),
  ];
}
