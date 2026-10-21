import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCases } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { imageUrlFor, localized } from "@/lib/sanity";
import { localizedPath, locales, type Locale } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { SEO_LABELS } from "@/lib/seo-copy";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return pageMetadata({ locale: locale as Locale, path: "/portfolio", title: t("title"), description: t("intro") });
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const [t, cases] = await Promise.all([getTranslations({ locale, namespace: "portfolio" }), getCases()]);
  const labels = SEO_LABELS[locale].breadcrumb;
  const breadcrumb = breadcrumbJsonLd(locale, "/portfolio", (path) => {
    if (path === "/") return labels.home;
    if (path === "/portfolio") return labels.portfolio;
    throw new Error(`Unknown portfolio breadcrumb path: ${path}`);
  });
  return <Section><Container>
    <JsonLd data={breadcrumb} />
    <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">Poerator / Portfolio</p>
    <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">{t("title")}</h1>
    <p className="mt-5 max-w-3xl text-lg leading-8 text-surface-muted">{t("intro")}</p>
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cases.map((item) => {
        const image = item.coverImage?.asset ? imageUrlFor(item.coverImage).width(900).height(600).url() : "";
        return <Link key={item._id} href={localizedPath(locale, `/portfolio/${item.slug}`)} className="group border border-surface-border bg-legal-black-panel">
          {image ? <div className="relative aspect-[16/10] overflow-hidden"><Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /></div> : <div className="aspect-[16/10] bg-[#18181d]" />}
          <div className="p-5"><p className="font-mono text-[10px] uppercase tracking-wider text-surface-muted">{item.clientName} · {item.projectType}</p><h2 className="mt-2 font-semibold text-white">{localized(item.title, locale) || item.clientName}</h2><p className="mt-3 line-clamp-3 text-sm leading-6 text-surface-muted">{localized(item.summary, locale)}</p></div>
        </Link>;
      })}
    </div>
  </Container></Section>;
}
