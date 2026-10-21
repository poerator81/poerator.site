import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "0nygebau";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);
export const imageUrlFor = (source: SanityImageSource) => builder.image(source);

export type Localized<T extends string = string> = Partial<Record<LocaleCode, T>>;
export type LocaleCode = "en" | "de" | "fr" | "pl" | "lt";

export function localized<T extends string>(value: Localized<T> | null | undefined, locale: LocaleCode): string {
  return value?.[locale] || value?.en || "";
}

export const categoriesQuery = `*[_type == "category"] | order(order asc) {
  _id, title, "slug": slug.current, order
}`;

export const equipmentQuery = `*[_type == "equipment"] | order(name.en asc) {
  _id, name, "slug": slug.current, "category": category->{_id, title, "slug": slug.current},
  seoName, capabilityGroup, shortDescription, availableCities, kitIncludes, specifications, gallery
}`;

export const equipmentBySlugQuery = `*[_type == "equipment" && slug.current == $slug][0] {
  _id, name, "slug": slug.current, "category": category->{_id, title, "slug": slug.current},
  seoName, capabilityGroup, shortDescription, availableCities, kitIncludes, specifications, gallery
}`;

export const casesQuery = `*[_type == "caseStudy"] | order(_createdAt desc) {
  _id, clientName, projectType, "slug": slug.current, title, summary, coverImage, videoUrl
}`;

export const caseBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id, clientName, projectType, "slug": slug.current, title, summary, coverImage, videoUrl
}`;

export const obVanQuery = `*[_type == "obVan"][0] {
  _id, name, "slug": slug.current, overview, hireTerms, cameraChannels,
  consoleSpecs, audioSpecs, replaySpecs
}`;

export const geoBySlugQuery = `*[_type == "geoLanding" && slug.current == $slug][0] {
  _id, city, "slug": slug.current, heroTitle, intro, ctaLabel,
  "focusEquipment": focusEquipment->{_id, name, "slug": slug.current, "category": category->{"slug": slug.current}, shortDescription, gallery}
}`;
