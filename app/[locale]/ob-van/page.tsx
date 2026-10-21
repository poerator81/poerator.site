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
import { OB_VAN_EQUIPMENT_LINKS, equipmentHref } from "@/lib/equipment-links";
import { getEquipment } from "@/lib/content";
import { localizedPath, locales, type Locale } from "@/i18n";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seoObVan.seo" });
  return pageMetadata({ locale: locale as Locale, path: "/ob-van", title: t("title"), description: t("description") });
}

export default async function ObVanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const [t, common, items] = await Promise.all([
    getTranslations({ locale, namespace: "seoObVan" }),
    getTranslations({ locale, namespace: "common" }),
    getEquipment(),
  ]);
  const fields = (keys: string[]) => keys.map((key) => [
    t(`fields.${key}.label`),
    t(`fields.${key}.value`),
  ] as [string, string]);
  const sections = [
    { key: "hireTerms", fields: ["hireTypes", "setup", "delivery"] },
    { key: "truckSpecs", fields: ["truckUnit", "truckType", "cameraChannels", "cameraControl", "fiberRun", "connectivity"] },
    { key: "cameraChannels", fields: ["channels", "cameraControl", "cameras", "lenses", "fiberRun"] },
    { key: "audioComms", fields: ["intercom"] },
    { key: "replay", fields: ["replaySystem"] },
    { key: "crew", fields: ["fullCrew", "dryHire", "crewIntercom"] },
    { key: "transmission", fields: ["connectivity", "localInternet", "fiberRun"] },
    { key: "coverage", fields: ["delivery", "hubs"] },
    { key: "leadTimes", fields: ["setup"] },
  ];
  const service = serviceJsonLd({
    locale,
    path: "/ob-van",
    name: "Outside broadcast van hire",
    serviceType: "OB van hire",
    description: "OB van: up to 12 camera channels, Starlink, slow-motion replay. Full crew or dry hire. Delivery EU-wide.",
  });
  const labels = SEO_LABELS[locale].breadcrumb;
  const breadcrumb = breadcrumbJsonLd(locale, "/ob-van", (path) => {
    if (path === "/") return labels.home;
    if (path === "/ob-van") return labels.obVan;
    throw new Error(`Unknown OB van breadcrumb path: ${path}`);
  });
  const quoteLink = <Link href={localizedPath(locale, "/contact")} className="mt-6 inline-flex bg-waveform-cyan px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black">{common("requestQuote")}</Link>;

  return <Section><Container>
    <JsonLd data={service} />
    <JsonLd data={breadcrumb} />
    <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">Poerator / OB Van</p>
    <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-6xl">{t("title")}</h1>
    <div className="mt-6 max-w-3xl"><FieldList fields={fields(["unit", "hireTypes", "delivery", "setup"])} /></div>
    {quoteLink}
    <div className="mt-12 grid gap-10 md:grid-cols-2">
      {sections.map(({ key, fields: fieldKeys }) => <section key={key} className="border-t border-surface-border pt-6">
        <h2 className="text-2xl font-semibold text-white">{t(`sections.${key}`)}</h2>
        <div className="mt-4">
          <FieldList fields={key === "cameraChannels" ? fields(fieldKeys.filter((field) => field !== "cameras" && field !== "lenses")) : fields(fieldKeys)} />
          {key === "cameraChannels" && <div className="mt-3 space-y-2 font-mono text-xs">
            {(["cameras", "lenses"] as const).map((field) => {
              const equipment = OB_VAN_EQUIPMENT_LINKS[field];
              return <p key={field}>
                <span className="text-surface-muted">{t(`fields.${field}.label`)}: </span>
                <Link href={localizedPath(locale, equipmentHref(equipment.slug, items))} className="text-waveform-cyan hover:underline">{equipment.anchor}</Link>
              </p>;
            })}
          </div>}
        </div>
        {key === "cameraChannels" && quoteLink}
      </section>)}
    </div>
    <section className="mt-12 border-t border-surface-border pt-6">
      <h2 className="text-2xl font-semibold text-white">{t("sections.requestQuote")}</h2>
      {quoteLink}
    </section>
  </Container></Section>;
}
