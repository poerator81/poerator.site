import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "../i18n";

const seoMessages = {
  en: () => import("../messages/seo/en.json"),
  de: () => import("../messages/seo/de.json"),
  fr: () => import("../messages/seo/fr.json"),
  pl: () => import("../messages/seo/pl.json"),
  lt: () => import("../messages/seo/lt.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locale) notFound();
  if (!locales.includes(locale as (typeof locales)[number])) notFound();
  const [messages, seo] = await Promise.all([
    import(`../messages/${locale}.json`),
    seoMessages[locale as keyof typeof seoMessages](),
  ]);
  return {
    locale,
    messages: { ...messages.default, ...seo.default },
  };
});
