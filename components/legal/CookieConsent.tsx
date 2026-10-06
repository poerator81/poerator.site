"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { localizedPath, type Locale } from "@/i18n";

const STORAGE_KEY = "poerator-cookie-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function CookieConsent({ locale }: { locale: Locale }) {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) setVisible(true);
        else if (stored === "granted") window.gtag?.("consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      } catch (error) {
        console.warn("Cookie consent preference could not be read", error);
        setVisible(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const respond = (choice: "granted" | "denied") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch (error) {
      console.warn("Cookie consent preference could not be saved", error);
    }
    window.gtag?.("consent", "update", { analytics_storage: choice, ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    setVisible(false);
  };

  if (!visible) return null;
  return <aside aria-label="Cookie consent" className="fixed inset-x-0 bottom-0 z-50 border-t border-surface-border bg-legal-black-panel px-4 py-4 md:px-8">
    <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
      <p className="text-sm leading-6 text-surface-muted">{t("message")}{" "}<Link href={localizedPath(locale, "/privacy-policy")} className="text-waveform-cyan underline underline-offset-2">{t("policyLinkText")}</Link>.</p>
      <div className="flex shrink-0 gap-3">
        <button type="button" onClick={() => respond("denied")} className="border border-surface-border px-4 py-2 font-mono text-xs uppercase tracking-wide text-surface-muted hover:text-white">{t("reject")}</button>
        <button type="button" onClick={() => respond("granted")} className="bg-waveform-cyan px-4 py-2 font-mono text-xs uppercase tracking-wide text-legal-black hover:bg-waveform-cyan-soft">{t("accept")}</button>
      </div>
    </div>
  </aside>;
}
