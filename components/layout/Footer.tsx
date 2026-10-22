import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { HUB_CITIES } from "@/lib/constants";
import { TEAM_LABELS } from "@/lib/team";
import { localizedPath, type Locale } from "@/i18n";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const c = await getTranslations({ locale, namespace: "common" });
  const n = await getTranslations({ locale, namespace: "nav" });
  const links = [
    { href: "/services", label: n("services") },
    { href: "/team", label: TEAM_LABELS.team[locale] },
    { href: "/video-production", label: "Video production" },
    { href: "/equipment", label: n("equipment") },
    { href: "/portfolio", label: n("portfolio") },
    { href: "/contact", label: n("contact") },
  ] as const;

  return (
    <footer className="border-t border-surface-border bg-legal-black-panel">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href={localizedPath(locale, "/")} aria-label="Poerator" className="inline-flex items-center">
              <Image
                src="/logo-white.png"
                alt="Poerator"
                width={1600}
                height={423}
                className="h-7 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-surface-muted">{t("description")}</p>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-surface-muted">{c("navigation")}</h2>
            <ul className="mt-4 space-y-3">{links.map(({ href, label }) => <li key={href}><Link href={localizedPath(locale, href)} className="text-sm text-white hover:text-waveform-cyan">{label}</Link></li>)}</ul>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-surface-muted">{c("cities")}</h2>
            <p className="mt-4 text-sm leading-7 text-white">{HUB_CITIES.join(" · ")}</p>
            <h2 className="mt-6 font-mono text-xs uppercase tracking-widest text-surface-muted">{c("contact")}</h2>
            <a className="mt-3 block text-sm text-white hover:text-waveform-cyan" href="mailto:hey@poerator.com">hey@poerator.com</a>
            <a className="mt-2 block text-sm text-white hover:text-waveform-cyan" href="tel:+37067278991">+370 672 78991</a>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-surface-border pt-6 text-xs text-surface-muted sm:flex-row">
          <p>© 2026 POERATOR. {t("rights").toUpperCase()}</p>
          <div className="flex gap-5">
            <a href="https://www.instagram.com/poerator_lab/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/company/108798958" target="_blank" rel="noreferrer">LinkedIn</a>
            <Link href={localizedPath(locale, "/privacy-policy")} className="hover:text-white">{t("privacyPolicy")}</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
