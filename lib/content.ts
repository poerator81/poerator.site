import {
  casesQuery,
  categoriesQuery,
  equipmentBySlugQuery,
  equipmentQuery,
  geoBySlugQuery,
  localized,
  obVanQuery,
  sanityClient,
  type LocaleCode,
} from "@/lib/sanity";

export type Category = {
  _id: string;
  title: Record<string, string>;
  slug: string;
  order?: number;
};

export type Specification = {
  _key?: string;
  label?: Record<string, string>;
  value?: Record<string, string>;
};

export type Equipment = {
  _id: string;
  name: Record<string, string>;
  slug: string;
  seoName?: string;
  capabilityGroup?: string;
  category?: Category;
  shortDescription?: Record<string, string>;
  availableCities?: string[];
  kitIncludes?: Record<string, string>[];
  specifications?: Specification[];
  gallery?: { _key?: string; asset?: { _ref: string } }[];
};

export type CaseStudy = {
  _id: string;
  clientName: string;
  projectType?: string;
  slug: string;
  title?: Record<string, string>;
  summary?: Record<string, string>;
  coverImage?: { asset?: { _ref: string } };
  videoUrl?: string;
};

export type ObVan = {
  name?: Record<string, string>;
  overview?: Record<string, string>;
  hireTerms?: Record<string, string>;
  cameraChannels?: number;
  consoleSpecs?: Specification[];
  audioSpecs?: Specification[];
  replaySpecs?: Specification[];
};

export type GeoLanding = {
  city: string;
  slug: string;
  heroTitle?: Record<string, string>;
  intro?: Record<string, string>;
  ctaLabel?: Record<string, string>;
  focusEquipment?: Pick<Equipment, "_id" | "name" | "slug" | "shortDescription" | "gallery"> & {
    category?: { slug: string };
  };
};

export const getCategories = () => sanityClient.fetch<Category[]>(categoriesQuery);
export const getEquipment = () => sanityClient.fetch<Equipment[]>(equipmentQuery);
export const getCases = () => sanityClient.fetch<CaseStudy[]>(casesQuery);
export const getObVan = () => sanityClient.fetch<ObVan | null>(obVanQuery);
export const getEquipmentBySlug = (slug: string) =>
  sanityClient.fetch<Equipment | null>(equipmentBySlugQuery, { slug });
export const getCaseBySlug = (slug: string) =>
  sanityClient.fetch<CaseStudy | null>(`*[_type == "caseStudy" && slug.current == $slug][0] {
    _id, clientName, projectType, "slug": slug.current, title, summary, coverImage, videoUrl
  }`, { slug });
export const getGeoBySlug = (slug: string) =>
  sanityClient.fetch<GeoLanding | null>(geoBySlugQuery, { slug });

export function text(value: Record<string, string> | null | undefined, locale: LocaleCode) {
  return localized(value, locale);
}
