import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Clapperboard, Radio, Sparkles, Truck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { serviceJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { SEO_LABELS, SERVICE_SCHEMA_COPY } from "@/lib/seo-copy";
import { FLEET_LINKS, equipmentHref } from "@/lib/equipment-links";
import { getEquipment } from "@/lib/content";
import { FLEET_COPY } from "@/lib/capability-groups";
import { localizedPath, locales, type Locale } from "@/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  return pageMetadata({ locale: locale as Locale, path: "/services", title: t("title"), description: t("intro") });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const [page, items] = await Promise.all([
    getTranslations({ locale, namespace: "servicesPage" }),
    getEquipment(),
  ]);
  const services = [
    { key: "liveProduction", href: "/contact", Icon: Radio, id: "live-production" },
    { key: "obVanHire", href: "/ob-van", Icon: Truck, id: "ob-van-hire" },
    { key: "equipmentRental", href: "/equipment", Icon: Camera, id: "equipment-rental" },
    { key: "videoProduction", href: "/video-production", Icon: Clapperboard, id: "video-production" },
    { key: "motionGraphics", href: "/contact", Icon: Sparkles, id: "motion-graphics" },
  ] as const;
  const labels = SEO_LABELS[locale].breadcrumb;
  const breadcrumb = breadcrumbJsonLd(locale, "/services", (path) => {
    if (path === "/") return labels.home;
    if (path === "/services") return labels.services;
    throw new Error(`Unknown services breadcrumb path: ${path}`);
  });
  const service = serviceJsonLd({ locale, path: "/services", ...SERVICE_SCHEMA_COPY[locale].services });
  return <Section><Container>
    <JsonLd data={service} />
    <JsonLd data={breadcrumb} />
    <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">Poerator / Services</p>
    <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-6xl">{page("title")}</h1>
    <p className="mt-6 max-w-3xl text-lg leading-8 text-surface-muted">{page("intro")}</p>
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      {services.map(({ key, href, Icon, id }) => <article id={id} key={key} className="scroll-mt-28 border border-surface-border bg-legal-black-panel p-7 md:p-9">
        <Icon aria-hidden="true" className="h-8 w-8 text-waveform-cyan" />
        <h2 className="mt-7 text-2xl font-semibold text-white">{t(`services.${key}.title`)}</h2>
        <p className="mt-3 max-w-xl leading-7 text-surface-muted">{t(`services.${key}.description`)}</p>
        <Link href={localizedPath(locale, href)} className="mt-6 inline-block font-mono text-xs uppercase tracking-wider text-waveform-cyan">{t("services.learnMore")} →</Link>
      </article>)}
    </div>
    <section className="mt-14 border-t border-surface-border pt-6">
      <h2 className="text-2xl font-semibold text-white">{FLEET_COPY[locale].fleetCapabilityLabel}</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {FLEET_LINKS.map(({ slug, anchor }) => {
          const href = equipmentHref(slug, items);
          const [label, linkText] = anchor.split(": ");
          return <li key={slug} className="border border-surface-border bg-legal-black-panel p-4 text-sm">
            <span className="text-surface-muted">{label}: </span>
            <Link href={localizedPath(locale, href)} className="text-waveform-cyan hover:underline">{linkText}</Link>
          </li>;
        })}
      </ul>
    </section>
  </Container></Section>;
}
