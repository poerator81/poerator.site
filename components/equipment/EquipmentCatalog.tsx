"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { FieldList } from "@/components/ui/FieldList";
import type { Category, Equipment } from "@/lib/content";
import { localizedPath, type Locale } from "@/i18n";

type Labels = {
  search: string;
  city: string;
  allCities: string;
  category: string;
  allCategories: string;
  noResults: string;
  availableIn: string;
};

export function EquipmentCatalog({ items, categories, locale, labels, detailsLabel, hireTerms }: {
  items: Equipment[];
  categories: Category[];
  locale: Locale;
  labels: Labels;
  detailsLabel: string;
  hireTerms: { title: string; fields: [string, string][]; quoteText: string };
}) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const cities = useMemo(() => Array.from(new Set(items.flatMap((item) => item.availableCities || []))).sort(), [items]);
  const filtered = items.filter((item) =>
    (!query || `${item.name[locale] || item.name.en || ""} ${item.shortDescription?.[locale] || ""}`.toLowerCase().includes(query.toLowerCase())) &&
    (!city || item.availableCities?.includes(city)) &&
    (!category || item.category?.slug === category),
  );

  return <>
    <div className="mt-10 grid gap-3 md:grid-cols-[1fr_220px_240px]">
      <label className="flex items-center gap-3 border border-surface-border bg-legal-black-panel px-4 py-3">
        <Search aria-hidden="true" className="h-4 w-4 text-surface-muted" />
        <span className="sr-only">{labels.search}</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.search} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-surface-muted" />
      </label>
      <label><span className="sr-only">{labels.city}</span><select value={city} onChange={(event) => setCity(event.target.value)} className="h-full min-h-12 w-full border border-surface-border bg-legal-black-panel px-4 text-sm text-white">
        <option value="">{labels.allCities}</option>{cities.map((name) => <option key={name} value={name}>{name}</option>)}
      </select></label>
      <label><span className="sr-only">{labels.category}</span><select value={category} onChange={(event) => setCategory(event.target.value)} className="h-full min-h-12 w-full border border-surface-border bg-legal-black-panel px-4 text-sm text-white">
        <option value="">{labels.allCategories}</option>{categories.map((item) => <option key={item._id} value={item.slug}>{item.title[locale] || item.title.en}</option>)}
      </select></label>
    </div>
    <section className="mt-8 grid gap-6 border border-surface-border bg-legal-black-panel p-6 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <h2 className="text-xl font-semibold text-white">{hireTerms.title}</h2>
        <div className="mt-4"><FieldList fields={hireTerms.fields} /></div>
      </div>
      <Link href={localizedPath(locale, "/contact")} className="inline-flex w-fit bg-waveform-cyan px-5 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black">
        {hireTerms.quoteText}
      </Link>
    </section>
    {filtered.length ? <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((item) => <Link key={item._id} href={localizedPath(locale, `/equipment/${item.category?.slug || "equipment"}/${item.slug}`)} className="group flex min-h-56 flex-col justify-between border border-surface-border bg-legal-black-panel p-6 transition hover:border-waveform-cyan/60">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-waveform-cyan">{item.category?.title[locale] || item.category?.title.en}</p>
          <h2 className="mt-3 text-xl font-semibold text-white">{item.name.en}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-surface-muted">{item.shortDescription?.[locale] || item.shortDescription?.en}</p>
        </div>
        <div className="mt-8 flex items-end justify-between gap-3">
          <p className="text-xs text-surface-muted">{labels.availableIn} {item.availableCities?.slice(0, 2).join(", ")}{(item.availableCities?.length || 0) > 2 ? ` +${(item.availableCities?.length || 0) - 2}` : ""}</p>
          <span className="shrink-0 text-xs text-waveform-cyan">{detailsLabel} →</span>
        </div>
      </Link>)}
    </div> : <p className="mt-12 border border-dashed border-surface-border p-8 text-center text-sm text-surface-muted">{labels.noResults}</p>}
  </>;
}
