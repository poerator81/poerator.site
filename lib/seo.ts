import type { Metadata } from "next";
import { locales, localizedPath, type Locale } from "@/i18n";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://poerator.com").replace(/\/$/, "");
export const HREFLANG: Record<Locale, string> = {
  en: "en",
  de: "de",
  fr: "fr",
  pl: "pl",
  lt: "lt",
};

export function absoluteUrl(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path.split(/[?#]/, 1)[0].replace(/\/+$/, "").toLowerCase();
  const prefixed = localizedPath(locale, clean || "/");
  return `${SITE_URL}${prefixed === "/" ? "" : prefixed.replace(/\/+$/, "")}`;
}

export function pageAlternates(locale: Locale, path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: absoluteUrl(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((item) => [HREFLANG[item], absoluteUrl(item, path)])),
      "x-default": absoluteUrl("en", path),
    },
  };
}

export function pageMetadata(options: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = absoluteUrl(options.locale, options.path);
  return {
    title: options.title,
    description: options.description,
    alternates: pageAlternates(options.locale, options.path),
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      siteName: "Poerator",
      locale: options.locale,
    },
  };
}
