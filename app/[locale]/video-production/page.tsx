import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { FieldList } from "@/components/ui/FieldList";
import { Section } from "@/components/ui/Section";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { SEO_LABELS } from "@/lib/seo-copy";
import { VIDEO_EQUIPMENT_LINKS, equipmentHref } from "@/lib/equipment-links";
import { getEquipment } from "@/lib/content";
import { FLEET_COPY } from "@/lib/capability-groups";
import { localizedPath, locales, type Locale } from "@/i18n";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "videoProduction.seo" });
  return pageMetadata({ locale: locale as Locale, path: "/video-production", title: t("title"), description: t("description") });
}

export default async function VideoProductionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const [t, common, items] = await Promise.all([
    getTranslations({ locale, namespace: "videoProduction" }),
    getTranslations({ locale, namespace: "common" }),
    getEquipment(),
  ]);
  const fields = (prefix: string, keys: string[]) => keys.map((key) => [
    t(`${prefix}.${key}.label`),
    t(`${prefix}.${key}.value`),
  ] as [string, string]);
  const service = serviceJsonLd({
    locale,
    path: "/video-production",
    name: "Video production",
    serviceType: "Video production",
    description: "Commercials, brand films, documentaries. Concept to final delivery.",
  });
  const labels = SEO_LABELS[locale].breadcrumb;
  const breadcrumb = breadcrumbJsonLd(locale, "/video-production", (path) => {
    if (path === "/") return labels.home;
    if (path === "/video-production") return labels.video;
    throw new Error(`Unknown video production breadcrumb path: ${path}`);
  });
  const projects = [
    { key: "gurtam", slug: "gurtam-commercial-production-service" },
    { key: "xmTextiles", slug: "video-production-for-xm-textiles" },
    { key: "nestedLands", slug: "nested-lands-tv-show-teaser-trailer" },
  ];
  const quoteLink = <Link href={localizedPath(locale, "/contact")} className="mt-6 inline-flex bg-waveform-cyan px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black">{common("requestQuote")}</Link>;

  return <Section><Container>
    <JsonLd data={service} />
    <JsonLd data={breadcrumb} />
    <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">Poerator / Video Production</p>
    <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-6xl">{t("title")}</h1>
    <div className="mt-6 max-w-3xl">
      <FieldList fields={[
        [t("company.label"), t("company.value")],
        [t("services.label"), t("services.value")],
        [t("scope.label"), t("scope.value")],
      ]} />
    </div>
    {quoteLink}

    <div className="mt-12 grid gap-10 md:grid-cols-2">
      <section className="border-t border-surface-border pt-6">
        <h2 className="text-2xl font-semibold text-white">{t("sections.services")}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 font-mono text-sm text-white">
          {[0, 1, 2, 3, 4].map((index) => <li key={index}>{t(`serviceItems.${index}`)}</li>)}
        </ul>
      </section>
      <section className="border-t border-surface-border pt-6">
        <h2 className="text-2xl font-semibold text-white">{t("sections.productionScope")}</h2>
        <div className="mt-4"><FieldList fields={fields("production", ["scope", "cycle", "motionGraphics"])} /></div>
      </section>
      <section className="border-t border-surface-border pt-6">
        <h2 className="text-2xl font-semibold text-white">{t("sections.equipment")}</h2>
        <ul className="mt-4 space-y-3 font-mono text-xs">
          {(["cameras", "lenses", "field", "lighting"] as const).map((field) => {
            const equipment = VIDEO_EQUIPMENT_LINKS[field];
            const label = field === "field"
              ? FLEET_COPY[locale].groups["field-capture"].title
              : field === "lighting"
                ? FLEET_COPY[locale].groups.lighting.title
                : t(`equipment.${field}.label`);
            return <li key={field}>
              <span className="text-surface-muted">{label}: </span>
              <Link href={localizedPath(locale, equipmentHref(equipment.slug, items))} className="text-waveform-cyan hover:underline">{equipment.anchor}</Link>
            </li>;
          })}
        </ul>
        <Link href={localizedPath(locale, "/equipment")} className="mt-5 inline-block font-mono text-xs uppercase tracking-wider text-waveform-cyan">{t("equipment.browse")} →</Link>
      </section>
    </div>

    <section className="mt-12 border-t border-surface-border pt-6">
      <h2 className="text-2xl font-semibold text-white">{t("sections.selectedProjects")}</h2>
      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {projects.map(({ key, slug }) => <li key={key}>
          <Link href={localizedPath(locale, `/portfolio/${slug}`)} className="block h-full border border-surface-border bg-legal-black-panel p-5 transition hover:border-waveform-cyan/60">
            <span className="text-lg font-semibold text-white">{t(`projects.${key}.name`)}</span>
            <span className="mt-2 block text-sm leading-6 text-surface-muted">{t(`projects.${key}.description`)}</span>
          </Link>
        </li>)}
      </ul>
    </section>

    <section className="mt-12 border-t border-surface-border pt-6">
      <h2 className="text-2xl font-semibold text-white">{t("sections.coverage")}</h2>
      <div className="mt-4"><FieldList fields={[[t("coverage.label"), t("coverage.value")]]} /></div>
    </section>

    <section className="mt-12 border-t border-surface-border pt-6">
      <h2 className="text-2xl font-semibold text-white">{t("sections.requestQuote")}</h2>
      {quoteLink}
    </section>
  </Container></Section>;
}
