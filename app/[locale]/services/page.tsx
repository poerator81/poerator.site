import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Clapperboard, Radio, Sparkles, Truck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { localizedPath, locales, type Locale } from "@/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  return { title: t("title"), description: t("intro") };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const page = await getTranslations({ locale, namespace: "servicesPage" });
  const services = [
    { key: "liveProduction", href: "/contact", Icon: Radio, id: "live-production" },
    { key: "obVanHire", href: "/ob-van", Icon: Truck, id: "ob-van-hire" },
    { key: "equipmentRental", href: "/equipment", Icon: Camera, id: "equipment-rental" },
    { key: "videoProduction", href: "/contact", Icon: Clapperboard, id: "video-production" },
    { key: "motionGraphics", href: "/contact", Icon: Sparkles, id: "motion-graphics" },
  ] as const;
  return <Section><Container>
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
  </Container></Section>;
}
