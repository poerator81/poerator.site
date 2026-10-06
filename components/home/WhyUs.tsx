import { Clock, Globe, ShieldCheck, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/i18n";

const reasons = [
  { key: "international", Icon: Globe },
  { key: "reliability", Icon: ShieldCheck },
  { key: "crew", Icon: Users },
  { key: "ready", Icon: Clock },
] as const;

export async function WhyUs({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home" });
  return <Section className="border-t border-surface-border">
    <Container>
      <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">{t("differenceEyebrow")}</p>
      <div className="mt-3 grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <h2 className="text-3xl font-bold text-white md:text-5xl">{t("differenceTitle")}</h2>
        <ul className="divide-y divide-surface-border border-y border-surface-border">
          {reasons.map(({ key, Icon }) => <li key={key} className="flex gap-5 py-5">
            <Icon aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-waveform-cyan" strokeWidth={1.5} />
            <div><h3 className="font-semibold text-white">{t(`difference.${key}.title`)}</h3><p className="mt-1 text-sm leading-6 text-surface-muted">{t(`difference.${key}.text`)}</p></div>
          </li>)}
        </ul>
      </div>
    </Container>
  </Section>;
}
