import type { Metadata } from "next";
import { locales, localizedPath, type Locale } from "@/i18n";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://poerator.com").replace(/\/$/, "");

export function absoluteUrl(locale: Locale, path: string) {
  const localized = localizedPath(locale, path);
  return `${SITE_URL}${localized === "/" ? "" : localized}`;
}

export function pageAlternates(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((item) => [item, absoluteUrl(item, path)])),
      "x-default": absoluteUrl("en", path),
    },
  };
}
