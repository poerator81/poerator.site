import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/jsonld";
import { locales, type Locale } from "@/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const contact = messages.contact;
  if (typeof contact !== "object" || contact === null || typeof contact.form !== "object" || contact.form === null) {
    throw new Error("Client contact-form translations are missing");
  }
  const clientMessages = {
    nav: messages.nav,
    cookieBanner: messages.cookieBanner,
    contact: { form: contact.form },
  };
  return <NextIntlClientProvider messages={clientMessages}>
    {/* Organization, not LocalBusiness: no confirmed public storefront address or opening hours. */}
    <JsonLd data={organizationJsonLd} />
    <Header />
    <main>{children}</main>
    <Footer locale={locale as Locale} />
    <GoogleAnalytics />
    <CookieConsent locale={locale as Locale} />
  </NextIntlClientProvider>;
}
