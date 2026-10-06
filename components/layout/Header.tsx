"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { locales, localizedPath, type Locale } from "@/i18n";

const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  pl: "Polski",
  lt: "Lietuvių",
};

export function Header() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const route = (pathname || "/").replace(/^\/(de|fr|pl|lt)(?=\/|$)/, "") || "/";
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const items = [
    ["services", "/services"],
    ["equipment", "/equipment"],
    ["obVan", "/ob-van"],
    ["portfolio", "/portfolio"],
    ["contact", "/contact"],
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-surface-border bg-legal-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href={localizedPath(locale, "/")} aria-label="Poerator home" className="text-2xl font-black tracking-tight text-white">
          POERATOR<span className="text-waveform-cyan">.</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {items.map(([key, href]) => (
            <Link key={href} href={localizedPath(locale, href)} className={`text-sm transition hover:text-waveform-cyan ${route === href ? "text-white" : "text-surface-muted"}`}>
              {t(key)}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <label className="sr-only" htmlFor="locale-select">{t("language")}</label>
          <select id="locale-select" aria-label={t("language")} value={locale} onChange={(event) => {
            const nextLocale = event.target.value as Locale;
            window.location.assign(localizedPath(nextLocale, route));
          }} className="max-w-32 bg-transparent text-sm text-surface-muted outline-none">
            {locales.map((item) => <option key={item} value={item} className="bg-legal-black">{localeNames[item]}</option>)}
          </select>
          <Link href={localizedPath(locale, "/contact")} className="bg-waveform-cyan px-5 py-3 text-xs font-semibold uppercase tracking-wider text-legal-black transition hover:bg-waveform-cyan-soft">
            {t("requestQuote")}
          </Link>
        </div>
        <button type="button" aria-label={open ? t("closeMenu") : t("menu")} aria-expanded={open} onClick={() => setOpen(!open)} className="p-2 text-white lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && <nav aria-label="Mobile navigation" className="border-t border-surface-border px-5 py-4 lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          {items.map(([key, href]) => <Link key={href} onClick={() => setOpen(false)} href={localizedPath(locale, href)} className="text-sm text-surface-muted hover:text-waveform-cyan">{t(key)}</Link>)}
          <div className="flex items-center gap-4 pt-2">
            {locales.map((item) => <Link key={item} onClick={() => setOpen(false)} href={localizedPath(item, route)} aria-current={locale === item ? "page" : undefined} className={`text-xs ${locale === item ? "text-waveform-cyan" : "text-surface-muted"}`}>{item.toUpperCase()}</Link>)}
          </div>
          <Link onClick={() => setOpen(false)} href={localizedPath(locale, "/contact")} className="mt-2 inline-flex w-fit bg-waveform-cyan px-5 py-3 text-xs font-semibold uppercase tracking-wider text-legal-black">{t("requestQuote")}</Link>
        </div>
      </nav>}
    </header>
  );
}
