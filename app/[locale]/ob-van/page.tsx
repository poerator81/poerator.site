import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getObVan } from "@/lib/content";
import { localized } from "@/lib/sanity";
import { localizedPath, locales, type Locale } from "@/i18n";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "obVan" });
  return { title: t("title"), description: t("intro") };
}

export default async function ObVanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const [record, t, common] = await Promise.all([
    getObVan(),
    getTranslations({ locale, namespace: "obVan" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  return <Section><Container>
    <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">Poerator / OB Van</p>
    <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-6xl">{t("title")}</h1>
    <p className="mt-6 max-w-3xl text-lg leading-8 text-surface-muted">{localized(record?.overview, locale) || t("intro")}</p>
    {record?.cameraChannels && <p className="mt-6 inline-flex border border-waveform-cyan/50 px-4 py-3 font-mono text-xs uppercase tracking-wider text-waveform-cyan">{t("cameraChannels", { count: record.cameraChannels })}</p>}
    <div className="mt-12 grid gap-10 lg:grid-cols-2">
      <div><h2 className="text-2xl font-semibold text-white">{t("hireTerms")}</h2><p className="mt-4 whitespace-pre-line leading-7 text-surface-muted">{localized(record?.hireTerms, locale)}</p></div>
      <div className="space-y-9">
        {([
          ["consoleSpecs", t("consoleSpecs")],
          ["audioSpecs", t("audioSpecs")],
          ["replaySpecs", t("replaySpecs")],
        ] as const).map(([key, title]) => {
          const specs = record?.[key] || [];
          return <div key={key}><h2 className="text-xl font-semibold text-white">{title}</h2><dl className="mt-4 divide-y divide-surface-border border-y border-surface-border">{specs.map((spec, index) => <div key={spec._key || index} className="grid grid-cols-2 gap-4 py-3 text-sm"><dt className="text-surface-muted">{localized(spec.label, locale)}</dt><dd className="text-white">{localized(spec.value, locale)}</dd></div>)}</dl></div>;
        })}
      </div>
    </div>
    <Link href={localizedPath(locale, "/contact")} className="mt-12 inline-block bg-waveform-cyan px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black">{common("requestQuote")}</Link>
  </Container></Section>;
}
