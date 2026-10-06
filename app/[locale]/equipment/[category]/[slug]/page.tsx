import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getEquipmentBySlug } from "@/lib/content";
import { imageUrlFor, localized } from "@/lib/sanity";
import { localizedPath, type Locale } from "@/i18n";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getEquipmentBySlug(slug);
  return item ? { title: item.name.en, description: localized(item.shortDescription, locale as Locale) } : {};
}

export default async function EquipmentDetailPage({ params }: { params: Promise<{ locale: string; category: string; slug: string }> }) {
  const { locale: localeParam, category: categorySlug, slug } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const [item, t, common] = await Promise.all([
    getEquipmentBySlug(slug),
    getTranslations({ locale, namespace: "equipmentPage" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  if (!item || (item.category?.slug && item.category.slug !== categorySlug)) notFound();
  const firstImage = item.gallery?.[0];
  const image = firstImage?.asset ? imageUrlFor(firstImage).width(1100).url() : "";
  return <Section><Container>
    <Link href={localizedPath(locale, `/equipment/${categorySlug}`)} className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">← {localized(item.category?.title, locale) || t("title")}</Link>
    <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative aspect-[4/3] overflow-hidden border border-surface-border bg-legal-black-panel">
        {image ? <Image src={image} alt={item.name.en} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain p-8" /> : <div className="flex h-full items-center justify-center p-8 text-center text-2xl font-semibold text-surface-muted">{item.name.en}</div>}
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-surface-muted">{localized(item.category?.title, locale)}</p>
        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">{item.name.en}</h1>
        <p className="mt-5 leading-7 text-surface-muted">{localized(item.shortDescription, locale)}</p>
        <p className="mt-6 text-sm text-surface-muted">{common("quantity")}: <span className="text-white">{item.quantityAvailable ?? "—"}</span></p>
        <p className="mt-3 text-sm text-surface-muted">{common("availableIn")}: <span className="text-white">{item.availableCities?.join(", ")}</span></p>
        <p className="mt-3 text-sm text-surface-muted">{common("hireTypes")}: <span className="text-white">{item.hireTypes?.join(", ")}</span></p>
        <Link href={localizedPath(locale, "/contact")} className="mt-8 inline-block bg-waveform-cyan px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black">{common("requestQuote")}</Link>
      </div>
    </div>
    {!!item.kitIncludes?.length && <div className="mt-14"><h2 className="text-2xl font-semibold text-white">{common("kitIncludes")}</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{item.kitIncludes.map((entry, i) => <li key={i} className="border border-surface-border px-4 py-3 text-sm text-surface-muted">{localized(entry, locale)}</li>)}</ul></div>}
    {!!item.specifications?.length && <div className="mt-14"><h2 className="text-2xl font-semibold text-white">{common("specifications")}</h2><dl className="mt-5 divide-y divide-surface-border border-y border-surface-border">{item.specifications.map((entry, i) => <div key={i} className="grid grid-cols-2 gap-4 py-4 text-sm"><dt className="text-surface-muted">{localized(entry.label, locale)}</dt><dd className="text-white">{localized(entry.value, locale)}</dd></div>)}</dl></div>}
  </Container></Section>;
}
