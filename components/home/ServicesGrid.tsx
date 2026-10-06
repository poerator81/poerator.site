import Link from "next/link";
import { Camera, Clapperboard, Radio, Sparkles, Truck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { localizedPath, type Locale } from "@/i18n";

const services = [
  { key: "liveProduction", href: "/services", Icon: Radio },
  { key: "obVanHire", href: "/ob-van", Icon: Truck },
  { key: "equipmentRental", href: "/equipment", Icon: Camera },
  { key: "videoProduction", href: "/services#video-production", Icon: Clapperboard },
  { key: "motionGraphics", href: "/services#motion-graphics", Icon: Sparkles },
] as const;

export async function ServicesGrid({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home" });
  return <Section className="border-t border-surface-border">
    <Container>
      <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">{t("servicesEyebrow")}</p>
      <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">{t("servicesTitle")}</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ key, href, Icon }) => <article key={key} className="group border border-surface-border bg-legal-black-panel p-6 transition-colors hover:border-waveform-cyan/50 md:p-8">
          <Icon aria-hidden="true" className="h-8 w-8 text-waveform-cyan" strokeWidth={1.4} />
          <h3 className="mt-8 text-xl font-semibold text-white">{t(`services.${key}.title`)}</h3>
          <p className="mt-3 min-h-14 text-sm leading-6 text-surface-muted">{t(`services.${key}.description`)}</p>
          <Link href={localizedPath(locale, href)} className="mt-8 inline-block font-mono text-xs uppercase tracking-wide text-waveform-cyan transition-colors group-hover:text-white">{t("services.learnMore")} →</Link>
        </article>)}
      </div>
    </Container>
  </Section>;
}
