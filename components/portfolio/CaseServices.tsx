import Link from "next/link";
import { localizedPath, type Locale } from "@/i18n";
import { CASE_SERVICES } from "@/lib/case-services";
import { SEO_LABELS } from "@/lib/seo-copy";

const CASE_ORDER = Object.keys(CASE_SERVICES);

export function CaseServices({ locale, caseSlug }: { locale: Locale; caseSlug: string }) {
  const item = CASE_SERVICES[caseSlug];
  if (!item) throw new Error(`Missing related-service configuration for case "${caseSlug}"`);
  const copy = SEO_LABELS[locale];
  const index = CASE_ORDER.indexOf(caseSlug);
  const deliveredPath = item.delivered === "live" ? "/services" : "/video-production";
  const deliveredName = item.delivered === "live" ? copy.serviceNames.live : copy.serviceNames.video;
  const deliveredAnchor = `${deliveredName}: ${copy.deliveredKinds[item.kind as keyof typeof copy.deliveredKinds]}`;
  const otherPaths = item.delivered === "live"
    ? ["/ob-van", "/video-production"]
    : ["/services", "/ob-van"];
  const otherAnchors = item.delivered === "live"
    ? [copy.otherAnchors.obVan[index % 3], copy.otherAnchors.video[index % 3]]
    : [copy.otherAnchors.live[index % 3], copy.otherAnchors.obVan[index % 3]];

  return <section className="mt-12 border-t border-surface-border pt-6">
    <h2 className="text-2xl font-semibold text-white">{copy.relatedServices}</h2>
    <p className="mt-4 text-sm text-surface-muted">
      <span className="mr-2">{copy.deliveredService}:</span>
      <Link href={localizedPath(locale, deliveredPath)} className="text-waveform-cyan hover:underline">{deliveredAnchor}</Link>
    </p>
    <p className="mt-3 text-sm text-surface-muted">
      <span className="mr-2">{copy.otherServices}:</span>
      {otherPaths.map((path, i) => <span key={path}>
        {i > 0 && ", "}
        <Link href={localizedPath(locale, path)} className="text-waveform-cyan hover:underline">{otherAnchors[i]}</Link>
      </span>)}
    </p>
  </section>;
}
