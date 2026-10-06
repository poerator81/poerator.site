import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getGeoBySlug } from "@/lib/content";
import { imageUrlFor, localized } from "@/lib/sanity";
import { localizedPath, type Locale } from "@/i18n";

export const revalidate = 60;

export default async function GeoLandingPage({ params }: { params: Promise<{ locale: string; geoSlug: string }> }) {
  const { locale: localeParam, geoSlug } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const [landing, common] = await Promise.all([
    getGeoBySlug(geoSlug),
    getTranslations({ locale, namespace: "common" }),
  ]);
  if (!landing) notFound();
  const item = landing.focusEquipment;
  const image = item?.gallery?.[0]?.asset ? imageUrlFor(item.gallery[0]).width(1000).url() : "";
  return <Section><Container>
    <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">Poerator / {landing.city}</p>
    <h1 className="mt-4 max-w-5xl text-4xl font-bold text-white md:text-6xl">{localized(landing.heroTitle, locale)}</h1>
    <p className="mt-6 max-w-3xl text-lg leading-8 text-surface-muted">{localized(landing.intro, locale)}</p>
    <Link href={localizedPath(locale, "/contact")} className="mt-8 inline-block bg-waveform-cyan px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black">{localized(landing.ctaLabel, locale) || common("requestQuote")}</Link>
    {item && <div className="mt-12 grid gap-8 border border-surface-border bg-legal-black-panel p-6 md:grid-cols-2 md:p-10">
      {image ? <div className="relative aspect-[4/3]"><Image src={image} alt={item.name.en} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" /></div> : <div className="aspect-[4/3] bg-[#18181d]" />}
      <div className="self-center"><h2 className="text-2xl font-semibold text-white">{item.name.en}</h2><p className="mt-4 leading-7 text-surface-muted">{localized(item.shortDescription, locale)}</p><Link href={localizedPath(locale, `/equipment/${item.category?.slug || "cameras"}/${item.slug}`)} className="mt-6 inline-block text-sm text-waveform-cyan">{common("viewAll")} →</Link></div>
    </div>}
  </Container></Section>;
}
