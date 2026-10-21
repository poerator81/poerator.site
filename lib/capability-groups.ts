import type { Locale } from "@/i18n";

export const CAPABILITY_GROUPS = [
  "live-multicamera",
  "switching-routing",
  "capture-playout",
  "optics",
  "field-capture",
  "comms-transmission",
  "lighting",
  "rigging-monitoring",
  "power",
] as const;

export type CapabilityGroup = (typeof CAPABILITY_GROUPS)[number];

type GroupCopy = { title: string; short: string; application: string };
type FleetCopy = {
  title: string;
  metaTitle: string;
  seoDescription: (items: number, groups: number) => string;
  purpose: string;
  catalog: string;
  capabilityGroups: string;
  projectTypes: string;
  citiesServed: string;
  supports: string;
  application: string;
  type: string;
  description: string;
  capability: string;
  relatedKit: string;
  details: string;
  requestQuote: string;
  noResults: string;
  purposeLabel: string;
  catalogLabel: string;
  fleetCapabilityLabel: string;
  groups: Record<CapabilityGroup, GroupCopy>;
};

export const FLEET_COPY: Record<Locale, FleetCopy> = {
  en: {
    title: "Equipment fleet",
    metaTitle: "Equipment Fleet | Production Capability",
    seoDescription: (items, groups) => `Poerator equipment fleet: ${items} items in ${groups} capability groups. Live multi-camera production, switching, optics, comms, lighting. 9 European cities.`,
    purpose: "fleet and production capability",
    catalog: "items",
    capabilityGroups: "Capability groups",
    projectTypes: "Project types",
    citiesServed: "Cities served",
    supports: "Supports",
    application: "Application",
    type: "Type",
    description: "Description",
    capability: "Capability",
    relatedKit: "Related kit",
    details: "View equipment",
    requestQuote: "Request a quote",
    noResults: "No equipment matches these filters.",
    purposeLabel: "Purpose",
    catalogLabel: "Catalog",
    fleetCapabilityLabel: "Fleet capability",
    groups: {
      "live-multicamera": { title: "Live multi-camera production", short: "Live Production", application: "live multi-camera production" },
      "switching-routing": { title: "Switching and routing", short: "Switching", application: "live switching and signal routing" },
      "capture-playout": { title: "Capture and playout", short: "Capture and Playout", application: "capture, playout and recording" },
      optics: { title: "Broadcast optics", short: "Broadcast Optics", application: "long-lens sport and broadcast optics" },
      "field-capture": { title: "Field capture", short: "Field Capture", application: "single-operator field capture" },
      "comms-transmission": { title: "Wireless comms and transmission", short: "Transmission", application: "wireless comms and video transmission" },
      lighting: { title: "Stage and interview lighting", short: "Stage Lighting", application: "stage and interview lighting" },
      "rigging-monitoring": { title: "Rigging, support and monitoring", short: "Rigging", application: "rigging, support and monitoring" },
      power: { title: "Camera and light power", short: "Power", application: "camera and light power" },
    },
  },
  de: {
    title: "Equipment-Flotte",
    metaTitle: "Equipment-Flotte | Produktionsmöglichkeiten",
    seoDescription: (items, groups) => `Poerator Equipment-Flotte: ${items} Geräte in ${groups} Einsatzbereichen. Live-Mehrkamera-Produktion, Bildmischung, Optik, Funk, Licht. 9 europäische Städte.`,
    purpose: "Flotte und Produktionsmöglichkeiten",
    catalog: "Geräte",
    capabilityGroups: "Einsatzbereiche",
    projectTypes: "Projektarten",
    citiesServed: "Abgedeckte Städte",
    supports: "Unterstützt",
    application: "Anwendung",
    type: "Typ",
    description: "Beschreibung",
    capability: "Einsatzbereich",
    relatedKit: "Ergänzende Ausrüstung",
    details: "Ausrüstung ansehen",
    requestQuote: "Angebot anfordern",
    noResults: "Keine Ausrüstung entspricht den Filtern.",
    purposeLabel: "Zweck",
    catalogLabel: "Katalog",
    fleetCapabilityLabel: "Ausrüstungskompetenz",
    groups: {
      "live-multicamera": { title: "Live-Mehrkamera-Produktion", short: "Live-Produktion", application: "Live-Mehrkamera-Produktion" },
      "switching-routing": { title: "Bildmischung und Signalverteilung", short: "Bildmischung", application: "Live-Bildmischung und Signalverteilung" },
      "capture-playout": { title: "Aufzeichnung und Wiedergabe", short: "Aufzeichnung", application: "Aufzeichnung, Wiedergabe und Recording" },
      optics: { title: "Broadcast-Optik", short: "Broadcast-Optik", application: "Teleoptik für Sport und Broadcast" },
      "field-capture": { title: "Mobile Aufnahme", short: "Mobile Aufnahme", application: "mobile Aufnahme durch eine Person" },
      "comms-transmission": { title: "Funkkommunikation und Übertragung", short: "Übertragung", application: "Funkkommunikation und Videoübertragung" },
      lighting: { title: "Bühnen- und Interviewbeleuchtung", short: "Bühnenlicht", application: "Bühnen- und Interviewbeleuchtung" },
      "rigging-monitoring": { title: "Rigging, Support und Monitoring", short: "Rigging", application: "Rigging, Support und Monitoring" },
      power: { title: "Stromversorgung für Kamera und Licht", short: "Stromversorgung", application: "Stromversorgung für Kamera und Licht" },
    },
  },
  fr: {
    title: "Parc matériel",
    metaTitle: "Parc matériel | Capacités de production",
    seoDescription: (items, groups) => `Parc matériel Poerator : ${items} équipements répartis dans ${groups} domaines. Production multicaméra, réalisation, optique, transmission, éclairage. 9 villes européennes.`,
    purpose: "parc matériel et capacités de production",
    catalog: "équipements",
    capabilityGroups: "Domaines de compétence",
    projectTypes: "Types de projets",
    citiesServed: "Villes couvertes",
    supports: "Pour",
    application: "Application",
    type: "Type",
    description: "Description",
    capability: "Compétence",
    relatedKit: "Équipements associés",
    details: "Voir l’équipement",
    requestQuote: "Demander un devis",
    noResults: "Aucun équipement ne correspond aux filtres.",
    purposeLabel: "Objectif",
    catalogLabel: "Catalogue",
    fleetCapabilityLabel: "Capacités du parc",
    groups: {
      "live-multicamera": { title: "Production multicaméra en direct", short: "Production live", application: "production multicaméra en direct" },
      "switching-routing": { title: "Réalisation et routage", short: "Réalisation", application: "réalisation en direct et routage des signaux" },
      "capture-playout": { title: "Capture et diffusion", short: "Capture et diffusion", application: "capture, diffusion et enregistrement" },
      optics: { title: "Optique broadcast", short: "Optique broadcast", application: "longues focales pour le sport et le broadcast" },
      "field-capture": { title: "Captation terrain", short: "Captation terrain", application: "captation terrain par un opérateur" },
      "comms-transmission": { title: "Intercom et transmission sans fil", short: "Transmission", application: "intercom sans fil et transmission vidéo" },
      lighting: { title: "Éclairage de plateau et d’interview", short: "Éclairage", application: "éclairage de plateau et d’interview" },
      "rigging-monitoring": { title: "Rigging, support et monitoring", short: "Rigging", application: "rigging, support et monitoring" },
      power: { title: "Alimentation caméra et éclairage", short: "Alimentation", application: "alimentation caméra et éclairage" },
    },
  },
  pl: {
    title: "Park sprzętowy",
    metaTitle: "Park sprzętowy | Możliwości produkcyjne",
    seoDescription: (items, groups) => `Park sprzętowy Poerator: ${items} urządzeń w ${groups} obszarach. Produkcja wielokamerowa, realizacja, optyka, łączność i oświetlenie. 9 europejskich miast.`,
    purpose: "park sprzętowy i możliwości produkcyjne",
    catalog: "urządzeń",
    capabilityGroups: "Obszary możliwości",
    projectTypes: "Typy projektów",
    citiesServed: "Obsługiwane miasta",
    supports: "Wspiera",
    application: "Zastosowanie",
    type: "Typ",
    description: "Opis",
    capability: "Możliwości",
    relatedKit: "Powiązany sprzęt",
    details: "Zobacz sprzęt",
    requestQuote: "Poproś o wycenę",
    noResults: "Brak sprzętu spełniającego kryteria.",
    purposeLabel: "Cel",
    catalogLabel: "Katalog",
    fleetCapabilityLabel: "Możliwości parku",
    groups: {
      "live-multicamera": { title: "Produkcja wielokamerowa na żywo", short: "Produkcja live", application: "produkcja wielokamerowa na żywo" },
      "switching-routing": { title: "Miksowanie i routing", short: "Miksowanie", application: "miksowanie na żywo i routing sygnału" },
      "capture-playout": { title: "Rejestracja i odtwarzanie", short: "Rejestracja", application: "rejestracja, odtwarzanie i nagrywanie" },
      optics: { title: "Optyka transmisyjna", short: "Optyka", application: "długie obiektywy sportowe i transmisyjne" },
      "field-capture": { title: "Rejestracja w terenie", short: "Teren", application: "jednoosobowa rejestracja w terenie" },
      "comms-transmission": { title: "Łączność bezprzewodowa i transmisja", short: "Transmisja", application: "łączność bezprzewodowa i transmisja wideo" },
      lighting: { title: "Oświetlenie sceniczne i wywiadowe", short: "Oświetlenie", application: "oświetlenie sceniczne i wywiadowe" },
      "rigging-monitoring": { title: "Rigging, mocowanie i monitoring", short: "Rigging", application: "rigging, mocowanie i monitoring" },
      power: { title: "Zasilanie kamer i oświetlenia", short: "Zasilanie", application: "zasilanie kamer i oświetlenia" },
    },
  },
  lt: {
    title: "Įrangos parkas",
    metaTitle: "Įrangos parkas | Gamybos galimybės",
    seoDescription: (items, groups) => `„Poerator“ įrangos parkas: ${items} įrangos vienetai, suskirstyti į ${groups} galimybių grupes. Tiesioginė kelių kamerų gamyba, optika, ryšys, apšvietimas. 9 Europos miestai.`,
    purpose: "įrangos parkas ir gamybos galimybės",
    catalog: "įrangos vienetai",
    capabilityGroups: "Galimybių grupės",
    projectTypes: "Projektų tipai",
    citiesServed: "Aptarnaujami miestai",
    supports: "Skirta",
    application: "Paskirtis",
    type: "Tipas",
    description: "Aprašymas",
    capability: "Galimybė",
    relatedKit: "Susijusi įranga",
    details: "Peržiūrėti įrangą",
    requestQuote: "Prašyti pasiūlymo",
    noResults: "Pagal filtrus įrangos nerasta.",
    purposeLabel: "Paskirtis",
    catalogLabel: "Katalogas",
    fleetCapabilityLabel: "Įrangos parko galimybės",
    groups: {
      "live-multicamera": { title: "Tiesioginė kelių kamerų gamyba", short: "Tiesioginė gamyba", application: "tiesioginė kelių kamerų gamyba" },
      "switching-routing": { title: "Perjungimas ir signalų maršrutizavimas", short: "Perjungimas", application: "tiesioginis perjungimas ir signalų maršrutizavimas" },
      "capture-playout": { title: "Įrašymas ir atkūrimas", short: "Įrašymas ir atkūrimas", application: "signalo fiksavimas, atkūrimas ir įrašymas" },
      optics: { title: "Transliacijų optika", short: "Transliacijų optika", application: "ilgo židinio nuotolio sporto ir transliacijų optika" },
      "field-capture": { title: "Filmavimas vietoje", short: "Filmavimas vietoje", application: "filmavimas vietoje vienam operatoriui" },
      "comms-transmission": { title: "Belaidis ryšys ir perdavimas", short: "Perdavimas", application: "belaidis ryšys ir vaizdo perdavimas" },
      lighting: { title: "Scenos ir interviu apšvietimas", short: "Apšvietimas", application: "scenos ir interviu apšvietimas" },
      "rigging-monitoring": { title: "Tvirtinimas, atramos ir stebėjimas", short: "Tvirtinimas", application: "tvirtinimas, atramos ir stebėjimas" },
      power: { title: "Kamerų ir šviestuvų maitinimas", short: "Maitinimas", application: "kamerų ir šviestuvų maitinimas" },
    },
  },
};

export function isCapabilityGroup(value: string | undefined): value is CapabilityGroup {
  return !!value && (CAPABILITY_GROUPS as readonly string[]).includes(value);
}

export const GROUP_ORDER = new Map(CAPABILITY_GROUPS.map((group, index) => [group, index]));
