import type { Metadata } from "next";
import { AtSign, BriefcaseBusiness, Mail, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HUB_CITIES } from "@/lib/constants";
import { locales, type Locale } from "@/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  return <Section><Container>
    <div className="grid gap-12 md:grid-cols-2">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">{t("eyebrow")}</p>
        <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">{t("title")}</h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-surface-muted">{t("subtitle")}</p>
        <div className="mt-10 space-y-4">
          <a href="mailto:hey@poerator.com" className="flex items-center gap-3 text-white hover:text-waveform-cyan"><Mail className="h-5 w-5 text-waveform-cyan" />hey@poerator.com</a>
          <a href="tel:+37067278991" className="flex items-center gap-3 text-white hover:text-waveform-cyan"><Phone className="h-5 w-5 text-waveform-cyan" />+370 672 78991</a>
        </div>
        <div className="mt-8 flex gap-5">
          <a href="https://www.instagram.com/poerator_lab/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-surface-muted hover:text-waveform-cyan"><AtSign className="h-5 w-5" />Instagram</a>
          <a href="https://www.linkedin.com/company/108798958" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-surface-muted hover:text-waveform-cyan"><BriefcaseBusiness className="h-5 w-5" />LinkedIn</a>
        </div>
        <p className="mt-10 font-mono text-xs uppercase tracking-wide text-surface-muted">{HUB_CITIES.join(" · ")}</p>
      </div>
      <ContactForm />
    </div>
  </Container></Section>;
}
