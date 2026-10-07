import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n";

const clients = [
  { name: "Arena Sport", src: "/logos/arena-sport.webp", width: 140, height: 56 },
  { name: "ESL FACEIT Group", src: "/logos/efg.jpg", width: 120, height: 56 },
  { name: "EJL", src: "/logos/ejl.webp", width: 56, height: 56 },
  { name: "FIBA", src: "/logos/fiba.png", width: 130, height: 56 },
  { name: "FOX News", src: "/logos/fox-news.png", width: 120, height: 56 },
  { name: "LFF", src: "/logos/lff.png", width: 56, height: 56 },
  { name: "Philip Morris International", src: "/logos/philip-morris-international.png", width: 77, height: 56 },
  { name: "Playsense", src: "/logos/playsense.png", width: 56, height: 56 },
  { name: "StarLadder", src: "/logos/starladder.png", width: 238, height: 56 },
  { name: "RFEF", src: "/logos/rfef.webp", width: 56, height: 56 },
  { name: "Wargaming", src: "/logos/wargaming.png", width: 150, height: 56 },
];

export async function TrustedBy({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.trustedBy" });
  return (
    <section aria-label={t("heading")} className="overflow-hidden border-y border-surface-border bg-legal-black-panel/40 py-8">
      <Container><p className="mb-6 text-center font-mono text-xs uppercase tracking-wide text-surface-muted">{t("heading")}</p></Container>
      <div className="trusted-marquee relative overflow-hidden">
        <div className="trusted-marquee-track flex w-max items-center">
          {[false, true].map((duplicate) => (
            <div
              key={String(duplicate)}
              aria-hidden={duplicate || undefined}
              className="trusted-marquee-set flex shrink-0 items-center gap-16"
            >
              {clients.map((client) => (
                <span key={client.name} className="flex shrink-0 items-center">
                  <Image
                    src={client.src}
                    alt={duplicate ? "" : client.name}
                    width={client.width}
                    height={client.height}
                    className="h-10 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
