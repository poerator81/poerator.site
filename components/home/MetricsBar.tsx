import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { CountUp } from "./CountUp";
import type { Locale } from "@/i18n";

const METRICS = [
  { key: "broadcasts", value: 5000, suffix: "+" },
  { key: "years", value: 8, suffix: "" },
  { key: "cities", value: 9, suffix: "" },
  { key: "units", value: 229, suffix: "+" },
] as const;

export async function MetricsBar({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <section>
      <Container>
        <dl className="grid grid-cols-2 gap-5 py-12 md:grid-cols-4">
          {METRICS.map((metric) => (
            <div key={metric.key} className="border-l border-waveform-cyan pl-4">
              <dd className="text-3xl font-semibold text-white md:text-4xl">
                <CountUp value={metric.value} suffix={metric.suffix} />
              </dd>
              <dt className="mt-2 font-mono text-[10px] leading-4 tracking-wider text-surface-muted">
                {t(`metrics.${metric.key}`)}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
