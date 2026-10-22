import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { imageUrlFor, localized } from "@/lib/sanity";
import type { CaseStudy } from "@/lib/content";
import { CARD_ALT } from "@/lib/case-content";
import { localizedPath, type Locale } from "@/i18n";

export async function SelectedWork({ locale, cases }: { locale: Locale; cases: CaseStudy[] }) {
  const t = await getTranslations({ locale, namespace: "home" });
  return <Section className="border-t border-surface-border">
    <Container>
      <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">{t("workEyebrow")}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <h2 className="text-3xl font-bold text-white md:text-5xl">{t("workTitle")}</h2>
        <Link href={localizedPath(locale, "/portfolio")} className="hidden text-sm text-waveform-cyan sm:block">{t("services.learnMore")} →</Link>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cases.slice(0, 6).map((item) => {
          const image = item.coverImage?.asset ? imageUrlFor(item.coverImage).width(800).height(520).url() : "";
          return <Link key={item._id} href={localizedPath(locale, `/portfolio/${item.slug}`)} className="group border border-surface-border bg-legal-black-panel">
            {image ? <div className="relative aspect-[16/10] overflow-hidden bg-[#18181d]"><Image src={image} alt={CARD_ALT[item.slug] ?? localized(item.title, locale) ?? item.clientName} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /></div> : <div className="aspect-[16/10] bg-gradient-to-br from-[#18181d] to-[#09090b]" />}
            <div className="flex items-start justify-between gap-4 p-5">
              <div><p className="font-mono text-[10px] uppercase tracking-wider text-surface-muted">{item.clientName} · {item.projectType}</p><h3 className="mt-2 font-semibold text-white">{localized(item.title, locale) || item.clientName}</h3></div>
              <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 text-waveform-cyan" />
            </div>
          </Link>;
        })}
      </div>
    </Container>
  </Section>;
}
