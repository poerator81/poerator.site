import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCategories, getEquipment } from "@/lib/content";
import { localizedPath, type Locale } from "@/i18n";
import { localized } from "@/lib/sanity";

export const revalidate = 60;

export default async function EquipmentCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale: localeParam, category: categorySlug } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const [categories, equipment, common] = await Promise.all([
    getCategories(),
    getEquipment(),
    getTranslations({ locale, namespace: "common" }),
  ]);
  const category = categories.find((item) => item.slug === categorySlug);
  if (!category) notFound();
  const items = equipment.filter((item) => item.category?.slug === category.slug);
  return <Section><Container>
    <p className="font-mono text-xs uppercase tracking-widest text-waveform-cyan">{localized(category.title, locale)}</p>
    <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">{localized(category.title, locale)}</h1>
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => <Link key={item._id} href={localizedPath(locale, `/equipment/${category.slug}/${item.slug}`)} className="border border-surface-border bg-legal-black-panel p-6 transition hover:border-waveform-cyan/60">
        <h2 className="text-xl font-semibold text-white">{item.name.en}</h2>
        <p className="mt-3 text-sm leading-6 text-surface-muted">{localized(item.shortDescription, locale)}</p>
        <p className="mt-6 text-xs text-surface-muted">{common("availableIn")} {item.availableCities?.join(", ")}</p>
      </Link>)}
    </div>
  </Container></Section>;
}
