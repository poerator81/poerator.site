import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SelectedWork } from "@/components/home/SelectedWork";
import { HeroVideo } from "@/components/home/HeroVideo";
import { HubsMap } from "@/components/home/HubsMap";
import { MetricsBar } from "@/components/home/MetricsBar";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TrustedBy } from "@/components/home/TrustedBy";
import { WhyUs } from "@/components/home/WhyUs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCases } from "@/lib/content";
import { HUB_CITIES } from "@/lib/constants";
import { localizedPath, locales, type Locale } from "@/i18n";

export const revalidate = 60;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const cases = await getCases();
  return <>
    <section className="relative isolate overflow-hidden border-b border-surface-border">
      <HeroVideo />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_75%_35%,rgba(0,229,199,0.10),transparent_42%)]" />
      <Container className="relative z-10 flex min-h-[620px] flex-col justify-center py-24 md:min-h-[720px]">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-waveform-cyan">{t("eyebrow")}</p>
        <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl md:text-7xl">{t("title")}</h1>
        <p className="mt-7 max-w-2xl text-base leading-7 text-surface-muted md:text-lg">{t("intro")}</p>
        <Link href={localizedPath(locale, "/contact")} className="mt-9 inline-flex w-fit items-center gap-3 bg-waveform-cyan px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black transition hover:bg-waveform-cyan-soft">{t("getQuote")}<ArrowUpRight className="h-4 w-4" /></Link>
        <span aria-hidden="true" className="absolute bottom-7 right-8 hidden text-surface-muted md:block"><ArrowDown className="h-5 w-5" /></span>
      </Container>
    </section>
    <TrustedBy locale={locale} />
    <MetricsBar locale={locale} />
    <ServicesGrid locale={locale} />
    <Section className="border-t border-surface-border">
      <Container>
        <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">{t("coverageEyebrow")}</p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">{t("coverageTitle")}</h2>
        <HubsMap label={t("hubsMapLabel")} />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {HUB_CITIES.map((city) => <span key={city} className="border border-surface-border px-5 py-6 font-mono text-xs tracking-widest text-surface-muted">{city.toUpperCase()}</span>)}
        </div>
      </Container>
    </Section>
    <SelectedWork locale={locale} cases={cases} />
    <WhyUs locale={locale} />
  </>;
}
