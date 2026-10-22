import type { Locale } from "@/i18n";

type L = Record<Locale, string>;
const x = (en: string, de: string, fr: string, pl: string, lt: string): L => ({ en, de, fr, pl, lt });

export const GEO_EQUIPMENT = {
  id: "equipment-blackmagic-ursa-broadcast-g2",
  slug: "blackmagic-ursa-broadcast-g2",
  category: "cameras",
  name: "Blackmagic URSA Broadcast G2",
};

export type GeoCity = {
  slug: string;
  city: string;
  locales: Locale[];
  deliveryTime: string;
  title: Partial<Record<Locale, string>>;
  h1: Partial<Record<Locale, string>>;
  eyebrow: Partial<Record<Locale, string>>;
  meta: Partial<Record<Locale, string>>;
  collection: Partial<Record<Locale, string>>;
};

const NAME = GEO_EQUIPMENT.name;

export const GEO_CITIES: GeoCity[] = [
  {
    slug: "blackmagic-ursa-g2-hire-paris",
    city: "Paris",
    locales: ["en", "de", "fr", "pl", "lt"],
    deliveryTime: "1-2",
    title: {
      en: `${NAME} Hire Paris | Poerator`,
      de: `${NAME} mieten Paris | Poerator`,
      fr: `Location ${NAME} Paris | Poerator`,
      pl: `Wynajem ${NAME} Paryż | Poerator`,
      lt: `${NAME} nuoma Paryžius | Poerator`,
    },
    h1: {
      en: `${NAME} Hire \u2014 Paris`,
      de: `${NAME} zum Mieten \u2013 Paris`,
      fr: `Location de ${NAME} \u2014 Paris`,
      pl: `Wynajem kamery ${NAME} \u2014 Pary\u017c`,
      lt: `\u201e${NAME}\u201c nuoma \u2014 Pary\u017eius`,
    },
    eyebrow: { en: "Paris", de: "Paris", fr: "Paris", pl: "Paris", lt: "Paris" },
    meta: {
      en: `${NAME} hire in Paris. Hire types: dry. Available units: 6.`,
      de: `${NAME} mieten in Paris. Mietart: dry. Verfügbare Einheiten: 6.`,
      fr: `Location ${NAME} à Paris. Type de location : dry. Unités disponibles : 6.`,
      pl: `Wynajem ${NAME} w Paryżu. Typ wynajmu: dry. Dostępne jednostki: 6.`,
      lt: `${NAME} nuoma Paryžiuje. Nuomos tipas: dry. Turimi vienetai: 6.`,
    },
    collection: { en: "pick-up in Paris", de: "Abholung in Paris", fr: "retrait à Paris", pl: "odbiór w Paryżu", lt: "atsiėmimas Paryžiuje" },
  },
  {
    slug: "blackmagic-ursa-g2-hire-berlin",
    city: "Berlin",
    locales: ["de"],
    deliveryTime: "1-2",
    title: { de: `${NAME} mieten Berlin | Poerator` },
    h1: { de: `${NAME} zum Mieten - Berlin` },
    eyebrow: { de: "Berlin" },
    meta: { de: `${NAME} mieten in Berlin. Mietart: dry. Verfügbare Einheiten: 6.` },
    collection: { de: "Abholung in Berlin" },
  },
  {
    slug: "blackmagic-ursa-g2-hire-london",
    city: "London",
    locales: ["en"],
    deliveryTime: "2-3",
    title: { en: `${NAME} Hire London | Poerator` },
    h1: { en: `${NAME} Hire - London` },
    eyebrow: { en: "London" },
    meta: { en: `${NAME} hire in London. Hire types: dry. Available units: 6.` },
    collection: { en: "pick-up in London" },
  },
  {
    slug: "blackmagic-ursa-g2-hire-warsaw",
    city: "Warsaw",
    locales: ["pl"],
    deliveryTime: "1-2",
    title: { pl: `Wynajem ${NAME} Warszawa | Poerator` },
    h1: { pl: `Wynajem ${NAME} - Warszawa` },
    eyebrow: { pl: "Warszawa" },
    meta: { pl: `Wynajem ${NAME} w Warszawie. Typ wynajmu: dry. Dostępne jednostki: 6.` },
    collection: { pl: "odbiór w Warszawie" },
  },
];

export const findGeoCity = (slug: string) => GEO_CITIES.find((item) => item.slug === slug);

export const hireAnchor = (locale: Locale, city: string) => ({
  en: `${NAME} hire - ${city}`,
  de: `${NAME} mieten - ${city}`,
  fr: `Location ${NAME} - ${city}`,
  pl: `Wynajem ${NAME} - ${city}`,
  lt: `${NAME} nuoma - ${city}`,
})[locale];

export const GEO_LABELS: Record<string, L> = {
  availability: x("Availability", "Verfügbarkeit", "Disponibilité", "Dostępność", "Prieinamumas"),
  equipment: x("Equipment", "Gerät", "Équipement", "Sprzęt", "Įranga"),
  city: x("City", "Stadt", "Ville", "Miasto", "Miestas"),
  hireTypes: x("Hire types", "Mietart", "Type de location", "Typ wynajmu", "Nuomos tipas"),
  units: x("Available units", "Verfügbare Einheiten", "Unités disponibles", "Dostępne jednostki", "Turimi vienetai"),
  leadTime: x("Lead time", "Vorlaufzeit", "Délai de préparation", "Czas realizacji", "Pasiruošimo laikas"),
  bookingWindow: x("Booking window", "Buchungszeitraum", "Fenêtre de réservation", "Okres rezerwacji", "Rezervacijos laikotarpis"),
  minimumHire: x("Minimum hire", "Mindestmietdauer", "Durée minimale de location", "Minimalny okres wynajmu", "Minimali nuomos trukmė"),
  kitIncludes: x("Kit includes", "Lieferumfang", "Contenu du kit", "Zawartość zestawu", "Komplekte"),
  fullSpec: x("Full specification", "Volle Spezifikation", "Spécification complète", "Pełna specyfikacja", "Pilna specifikacija"),
  hireTerms: x("Hire terms", "Mietbedingungen", "Conditions de location", "Warunki wynajmu", "Nuomos sąlygos"),
  operator: x("Operator", "Bediener", "Opérateur", "Operator", "Operatorius"),
  insurance: x("Insurance", "Versicherung", "Assurance", "Ubezpieczenie", "Draudimas"),
  deposit: x("Deposit", "Kaution", "Caution", "Kaucja", "Depozitas"),
  coverageDelivery: x("Coverage and delivery", "Abdeckung und Lieferung", "Couverture et livraison", "Zasięg i dostawa", "Aprėptis ir pristatymas"),
  coverage: x("Coverage", "Abdeckung", "Couverture", "Zasięg", "Aprėptis"),
  delivery: x("Delivery", "Lieferung", "Livraison", "Dostawa", "Pristatymas"),
  deliveryTime: x("Delivery time", "Lieferzeit", "Délai de livraison", "Czas dostawy", "Pristatymo laikas"),
  collection: x("Collection", "Abholung", "Retrait", "Odbiór", "Atsiėmimas"),
  support: x("On-site support", "Support vor Ort", "Assistance sur site", "Wsparcie na miejscu", "Pagalba vietoje"),
  locations: x("Locations", "Standorte", "Sites", "Lokalizacje", "Vietos"),
  relatedEquipment: x("Related equipment", "Zubehör", "Équipement associé", "Powiązany sprzęt", "Susijusi įranga"),
  relatedServices: x("Related services", "Leistungen", "Services associés", "Usługi", "Susijusios paslaugos"),
  cities: x("Cities", "Städte", "Villes", "Miasta", "Miestai"),
  quote: x("Request a quote", "Angebot anfordern", "Demander un devis", "Poproś o wycenę", "Prašyti pasiūlymo"),
  no: x("no", "nein", "non", "nie", "ne"),
  yes: x("yes", "ja", "oui", "tak", "taip"),
  quotedSeparately: x("quoted separately", "separat angeboten", "devisée séparément", "wyceniane osobno", "skaičiuojama atskirai"),
  individual: x("individual", "individuell", "individuel", "indywidualna", "individualus"),
  leadTimeValue: x("1-2 days", "1-2 Tage", "1 à 2 jours", "1-2 dni", "1-2 dienos"),
  bookingWindowValue: x("12 months", "12 Monate", "12 mois", "12 miesięcy", "12 mėnesių"),
  minimumHireValue: x("1 day", "1 Tag", "1 jour", "1 dzień", "1 diena"),
  cameraBody: x("Camera body", "Kameragehäuse", "Boîtier de caméra", "Korpus kamery", "Kameros korpusas"),
};

export const DELIVERY_DAYS: Record<string, L> = {
  "1-2": GEO_LABELS.leadTimeValue,
  "2-3": x("2-3 days", "2-3 Tage", "2 à 3 jours", "2-3 dni", "2-3 dienos"),
};

export const RELATED_EQUIPMENT = [
  { category: "switching-control", slug: "atem-4-m-e-constellation-4k" },
  { category: "audio-comms", slug: "hollyland-solidcom-c1-pro-8s" },
  { category: "lenses", slug: "fujinon-xa20sx8-5berm-k3-eng-lens" },
  { category: "cameras", slug: "blackmagic-micro-studio-camera-4k-g2" },
];
