import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { locales, type Locale } from "@/i18n";

const sectionKeys = ["controller", "dataCollected", "purpose", "cookies", "sharing", "transfers", "retention", "rights", "security", "children", "changes", "contact"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });
  return <Section><Container>
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold text-white md:text-5xl">{t("title")}</h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-wide text-surface-muted">{t("lastUpdated")}</p>
      <p className="mt-8 text-base leading-7 text-surface-muted">{t("intro")}</p>
      <div className="mt-10 space-y-10">{sectionKeys.map((key) => <section key={key}>
        <h2 className="text-xl font-semibold text-white">{t(`${key}Heading`)}</h2>
        <p className="mt-3 text-base leading-7 text-surface-muted">{t(`${key}Body`)}</p>
      </section>)}</div>
    </div>
  </Container></Section>;
}
