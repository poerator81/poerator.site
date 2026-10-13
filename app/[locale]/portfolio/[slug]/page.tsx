import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCaseBySlug } from "@/lib/content";
import { imageUrlFor, localized } from "@/lib/sanity";
import { localizedPath, type Locale } from "@/i18n";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getCaseBySlug(slug);
  return item ? { title: localized(item.title, locale as Locale) || item.clientName, description: localized(item.summary, locale as Locale) } : {};
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const [item, t, video] = await Promise.all([
    getCaseBySlug(slug),
    getTranslations({ locale, namespace: "portfolio" }),
    getTranslations({ locale, namespace: "videoProduction" }),
  ]);
  if (!item) notFound();
  const image = item.coverImage?.asset ? imageUrlFor(item.coverImage).width(1600).url() : "";
  const title = localized(item.title, locale) || item.clientName;
  return <Section><Container>
    <Link href={localizedPath(locale, "/portfolio")} className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">← {t("title")}</Link>
    <p className="mt-8 font-mono text-xs uppercase tracking-wider text-surface-muted">{item.clientName} · {item.projectType}</p>
    <h1 className="mt-3 max-w-5xl text-4xl font-bold text-white md:text-6xl">{title}</h1>
    {image && <div className="relative mt-10 aspect-[16/9] max-h-[650px] overflow-hidden border border-surface-border"><Image src={image} alt={title} fill sizes="100vw" className="object-cover" /></div>}
    <p className="mt-8 max-w-3xl whitespace-pre-line text-lg leading-8 text-surface-muted">{localized(item.summary, locale)}</p>
    {item.videoUrl && <a href={item.videoUrl} target="_blank" rel="noreferrer" className="mt-7 inline-block text-sm text-waveform-cyan">{t("watch")} ↗</a>}
    {slug === "video-production-for-xm-textiles" && <Link href={localizedPath(locale, "/video-production")} className="mt-7 block font-mono text-xs uppercase tracking-wider text-waveform-cyan">{video("title")} →</Link>}
  </Container></Section>;
}
