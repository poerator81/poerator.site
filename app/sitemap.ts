import type { MetadataRoute } from "next";
import { locales, localizedPath, type Locale } from "@/i18n";
import { HREFLANG } from "@/lib/seo";
import { GEO_CITIES } from "@/lib/geo-pages";
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

// Pages with a fixed lastmod: updated only when the page content is edited.
const FIXED_LASTMOD: Record<string, Date> = {
  "/video-production": new Date("2026-10-22T00:00:00+03:00"),
  "/ob-van": new Date("2026-10-22T00:00:00+03:00"),
};

const GEO_LASTMOD = new Date("2026-10-22T00:00:00+03:00");
const TEAM_LASTMOD = new Date("2026-10-22T00:00:00+03:00");

type Slugs = {
  equipment: { slug: string; category: string; updated: string }[];
  categories: { slug: string; updated: string }[];
  cases: { slug: string; updated: string }[];
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
      entry(path, FIXED_LASTMOD[path] ?? now, path === "" ? 1 : 0.8, "weekly"),
    ),
    ...entry("/team", TEAM_LASTMOD, 0.7, "monthly"),
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
    ...GEO_CITIES.flatMap((page) =>
      page.locales.length === locales.length
        ? entry(`/${page.slug}`, GEO_LASTMOD, 0.7, "monthly")
        : page.locales.map((locale: Locale) => ({
            url: `${BASE}${localizedPath(locale, `/${page.slug}`)}`,
            lastModified: GEO_LASTMOD,
            changeFrequency: "monthly" as const,
            priority: 0.7,
          })),
    ),
  ];
}
