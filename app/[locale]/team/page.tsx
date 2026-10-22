import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { breadcrumbJsonLd, CITIES, ORG_ID } from "@/lib/jsonld";
import { absoluteUrl, pageMetadata, SITE_URL } from "@/lib/seo";
import { SEO_LABELS } from "@/lib/seo-copy";
import {
  CASE_NAMES, LANGUAGE_NAMES, RESPONSIBILITY, ROLE_LABELS, TEAM, TEAM_CITIES, TEAM_LABELS, TEAM_SECTIONS,
  type TeamMember,
} from "@/lib/team";
import { localizedPath, locales, type Locale } from "@/i18n";

export const revalidate = 3600;

const label = (key: string, locale: Locale) => TEAM_LABELS[key][locale];
const caseSlugs = (member: TeamMember) => member.cases === "all" ? Object.keys(CASE_NAMES) : member.cases;
const area = (role: TeamMember["roles"][number], locale: Locale) => RESPONSIBILITY[role][locale];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  return pageMetadata({
    locale,
    path: "/team",
    title: label("team", locale),
    description: `${label("teamSize", locale)}: ${TEAM.length}. ${label("locations", locale)}: ${TEAM_CITIES.join(", ")}. ${label("projects", locale)}: ${Object.keys(CASE_NAMES).length}.`,
  });
}

function Row({ name, children }: { name: string; children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-x-3">
    <dt className="text-surface-muted">{name}:</dt>
    <dd className="text-white">{children}</dd>
  </div>;
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const common = await getTranslations({ locale, namespace: "common" });
  const seoNames = SEO_LABELS[locale].serviceNames;
  const quote = <Link href={localizedPath(locale, "/contact")} className="mt-6 inline-flex bg-waveform-cyan px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-legal-black">{common("requestQuote")}</Link>;
  const link = "text-waveform-cyan hover:underline";

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      ...TEAM.map((member) => {
        const roles = member.roles.map((role) => ROLE_LABELS[role][locale]);
        return {
          "@type": "Person",
          "@id": `${SITE_URL}/team#${member.slug}`,
          url: `${absoluteUrl(locale, "/team")}#${member.slug}`,
          name: member.name,
          jobTitle: roles.length === 1 ? roles[0] : roles,
          worksFor: { "@id": ORG_ID },
          knowsAbout: member.roles.flatMap((role) => area(role, locale)).filter((item, i, all) => all.indexOf(item) === i).slice(0, 4),
          sameAs: [member.instagram],
        };
      }),
      { "@type": "Organization", "@id": ORG_ID, employee: TEAM.map((member) => ({ "@id": `${SITE_URL}/team#${member.slug}` })) },
    ],
  };
  const labels = SEO_LABELS[locale].breadcrumb;
  const breadcrumb = breadcrumbJsonLd(locale, "/team", (path) => path === "/" ? labels.home : label("team", locale));

  const renderMember = (member: TeamMember, role: TeamMember["roles"][number]) => {
    const primary = member.roles[0] === role;
    const responsibility = area(role, locale).map((item, i) => i === 0 ? item : item.charAt(0).toLowerCase() + item.slice(1)).join(", ");
    return <section key={`${member.slug}-${role}`} id={primary ? member.slug : `${member.slug}-2`} className="border-t border-surface-border pt-6">
      <h2 className="text-2xl font-semibold text-white">{member.name}</h2>
      <div className={primary ? "mt-4 grid gap-6 sm:grid-cols-[200px_1fr]" : "mt-4"}>
        {primary && <div className="aspect-[4/5] w-[200px] overflow-hidden bg-legal-black-panel">
          <Image src={`/team/${member.slug}.webp`} alt={member.name} width={800} height={1000} sizes="200px" className="h-full w-full object-cover" />
        </div>}
        <dl className="space-y-2 font-mono text-sm">
          <Row name={label("role", locale)}>{ROLE_LABELS[role][locale]}</Row>
          <Row name={label("responsibility", locale)}>{responsibility}</Row>
          {primary && <>
            <Row name={label("projects", locale)}><ul className="space-y-1">{caseSlugs(member).map((slug) => <li key={slug}><Link href={localizedPath(locale, `/portfolio/${slug}`)} className={link}>{CASE_NAMES[slug]}</Link></li>)}</ul></Row>
            <Row name={label("specialisation", locale)}><ul className="space-y-1">{member.equipment.map((item) => <li key={item.slug}><Link href={localizedPath(locale, `/equipment/${item.category}/${item.slug}`)} className={link}>{item.name}</Link></li>)}</ul></Row>
            <Row name={label("location", locale)}>{member.city}</Row>
            <Row name={label("languages", locale)}>{member.languages.map((key) => LANGUAGE_NAMES[key][locale]).join(", ")}</Row>
            <Row name="Instagram"><a href={member.instagram} rel="me noopener" target="_blank" className={link}>{member.instagram.replace("https://www.instagram.com/", "@").replace(/\/$/, "")}</a></Row>
          </>}
        </dl>
      </div>
    </section>;
  };

  return <Section><Container>
    <JsonLd data={graph} />
    <JsonLd data={breadcrumb} />
    <h1 className="max-w-4xl text-4xl font-bold text-white md:text-6xl">{label("team", locale)}</h1>
    <section className="mt-10 max-w-3xl">
      <h2 className="text-2xl font-semibold text-white">{label("company", locale)}</h2>
      <dl className="mt-4 space-y-2 font-mono text-sm">
        <Row name={label("activity", locale)}>{[seoNames.live, seoNames.obVan, seoNames.video].join(", ")}</Row>
        <Row name={label("markets", locale)}>{CITIES.join(", ")}</Row>
        <Row name={label("teamSize", locale)}>{TEAM.length}</Row>
        <Row name={label("locations", locale)}>{TEAM_CITIES.join(", ")}</Row>
      </dl>
      {quote}
    </section>
    {TEAM_SECTIONS.map(({ heading, role }) => {
      const members = TEAM.filter((member) => member.roles.includes(role));
      if (!members.length) return null;
      return <div key={heading} className="mt-14 max-w-4xl">
        <h2 className="text-3xl font-semibold text-white">{label(heading, locale)}</h2>
        <div className="mt-6 space-y-10">{members.map((member) => renderMember(member, role))}</div>
      </div>;
    })}
    <section className="mt-14 max-w-3xl border-t border-surface-border pt-6">
      <h2 className="text-2xl font-semibold text-white">{common("contact")}</h2>
      <dl className="mt-4 space-y-2 font-mono text-sm">
        <Row name={label("quoteRequests", locale)}>{quote}</Row>
        <Row name={label("portfolio", locale)}><Link href={localizedPath(locale, "/portfolio")} className={link}>{label("portfolio", locale)}</Link></Row>
        <Row name={label("equipment", locale)}><Link href={localizedPath(locale, "/equipment")} className={link}>{label("equipment", locale)}</Link></Row>
      </dl>
    </section>
  </Container></Section>;
}
