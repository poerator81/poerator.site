import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CaseServices } from "@/components/portfolio/CaseServices";
import { CaseBody, CaseHeader } from "@/components/portfolio/CaseDetails";
import { PROJECT_LEAD, ROLE_LABELS, TEAM_LABELS } from "@/lib/team";
import { CARD_ALT, CASE_CONTENT, resolveText } from "@/lib/case-content";
import { getCaseBySlug } from "@/lib/content";
import { imageUrlFor, localized } from "@/lib/sanity";
import { localizedPath, type Locale } from "@/i18n";
import { breadcrumbJsonLd, ORG_ID } from "@/lib/jsonld";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { SEO_LABELS } from "@/lib/seo-copy";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getCaseBySlug(slug);
  if (!item) return {};
  const content = CASE_CONTENT[slug];
  const metadata = pageMetadata({
    locale: locale as Locale,
    path: `/portfolio/${slug}`,
    title: content ? resolveText(content.seoTitle, locale as Locale) : localized(item.title, locale as Locale) || item.clientName,
    description: content ? resolveText(content.seoDescription, locale as Locale) : localized(item.summary, locale as Locale),
  });
  // The SEO titles already end with "| Poerator", so the root title template must not append it again.
  return content ? { ...metadata, title: { absolute: resolveText(content.seoTitle, locale as Locale) } } : metadata;
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const [item, t, common] = await Promise.all([
    getCaseBySlug(slug),
    getTranslations({ locale, namespace: "portfolio" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  if (!item) notFound();
  const image = item.coverImage?.asset ? imageUrlFor(item.coverImage).width(1600).url() : "";
  const title = localized(item.title, locale) || item.clientName;
  const content = CASE_CONTENT[slug];
  const path = `/portfolio/${slug}`;
  const labels = SEO_LABELS[locale].breadcrumb;
  const breadcrumb = breadcrumbJsonLd(locale, path, (segmentPath) => {
    if (segmentPath === "/") return labels.home;
    if (segmentPath === "/portfolio") return labels.portfolio;
    if (segmentPath === path) return title;
    throw new Error(`Unknown portfolio breadcrumb path: ${segmentPath}`);
  });
  return <Section><Container>
    <JsonLd data={breadcrumb} />
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE_URL}/team#${PROJECT_LEAD.slug}`,
      name: PROJECT_LEAD.name,
      jobTitle: ROLE_LABELS.producer[locale],
      worksFor: { "@id": ORG_ID },
    }} />
    <Link href={localizedPath(locale, "/portfolio")} className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">← {t("title")}</Link>
    <p className="mt-8 font-mono text-xs uppercase tracking-wider text-surface-muted">{item.clientName} · {item.projectType}</p>
    <h1 className="mt-3 max-w-5xl text-4xl font-bold text-white md:text-6xl">{title}</h1>
    <p className="mt-4 font-mono text-sm"><span className="text-surface-muted">{TEAM_LABELS.projectLead[locale]}: </span><Link href={`${localizedPath(locale, "/team")}#${PROJECT_LEAD.slug}`} className="text-waveform-cyan hover:underline">{PROJECT_LEAD.name}</Link></p>
    {image && <div className="relative mt-10 aspect-[16/9] max-h-[650px] overflow-hidden border border-surface-border"><Image src={image} alt={CARD_ALT[slug] ?? title} fill sizes="100vw" className="object-cover" /></div>}
    {content ? <CaseHeader content={content} locale={locale} /> : <p className="mt-8 max-w-3xl whitespace-pre-line text-lg leading-8 text-surface-muted">{localized(item.summary, locale)}</p>}
    {item.videoUrl && <a href={item.videoUrl} target="_blank" rel="noreferrer" className="mt-7 inline-block text-sm text-waveform-cyan">{t("watch")} ↗</a>}
    {content && <CaseBody content={content} locale={locale} quoteLabel={common("requestQuote")} />}
    {!content?.plainRelated && <CaseServices locale={locale} caseSlug={slug} />}
  </Container></Section>;
}
