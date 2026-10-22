import type { Locale } from "@/i18n";

export type ArchetypeKey = "producer" | "technical" | "camera" | "vision";
export type LanguageKey = "ru" | "en" | "lt" | "fr" | "et";
type L = Record<Locale, string>;

export type TeamMember = {
  slug: string;
  name: string;
  roles: ArchetypeKey[];
  city: string;
  instagram: string;
  languages: LanguageKey[];
  equipment: { category: string; slug: string; name: string }[];
  cases: string[] | "all";
};

const ATEM_4 = { category: "switching-control", slug: "atem-4-m-e-constellation-4k", name: "ATEM 4 M/E Constellation 4K" };
const ATEM_2 = { category: "switching-control", slug: "atem-2-m-e-advanced-panel-20", name: "ATEM 2 M/E Advanced Panel 20" };
const VIDEOHUB = { category: "switching-control", slug: "blackmagic-videohub-40x40-12g", name: "Blackmagic Videohub 40x40 12G" };
const URSA_G2 = { category: "cameras", slug: "blackmagic-ursa-broadcast-g2", name: "Blackmagic URSA Broadcast G2" };
const URSA_12K = { category: "cameras", slug: "blackmagic-ursa-mini-pro-12k", name: "Blackmagic URSA Mini Pro 12K" };
const FUJINON = { category: "lenses", slug: "fujinon-xa20sx8-5berm-k3-eng-lens", name: "Fujinon XA20sx8.5BERM-K3 ENG Lens" };
const STREAM_DECK = { category: "switching-control", slug: "stream-deck-xl-expanded-32-key", name: "Stream Deck XL Expanded 32-Key" };

export const TEAM: TeamMember[] = [
  { slug: "roman-chernyavskiy", name: "Roman Chernyavskiy", roles: ["producer"], city: "Vilnius", instagram: "https://www.instagram.com/poerator", languages: ["ru", "en", "lt"], equipment: [ATEM_4, URSA_G2], cases: "all" },
  { slug: "yana-sabaleuskaya", name: "Yana Sabaleuskaya", roles: ["technical"], city: "Vilnius", instagram: "https://www.instagram.com/obez.yanka", languages: ["ru", "en"], equipment: [ATEM_4, ATEM_2, VIDEOHUB, URSA_G2], cases: ["iem-masters-cologne", "corgi-race-vilnius-2026", "esports-community-casts"] },
  { slug: "konstantin-ostapenko", name: "Konstantin Ostapenko", roles: ["camera"], city: "Vilnius", instagram: "https://www.instagram.com/kostia.ostap/", languages: ["ru", "en", "lt"], equipment: [URSA_G2, URSA_12K, FUJINON], cases: ["corgi-race-vilnius-2026", "corgi-race-vilnius-2025-stream"] },
  { slug: "hlib-dubrovin", name: "Hlib Dubrovin", roles: ["technical"], city: "Paris", instagram: "https://www.instagram.com/doobrovin_gleb/", languages: ["ru", "en", "fr"], equipment: [ATEM_4, ATEM_2, VIDEOHUB, URSA_G2], cases: ["ewc-2026-paris"] },
  { slug: "andrej-vinogradov", name: "Andrej Vinogradov", roles: ["vision"], city: "Vilnius", instagram: "https://www.instagram.com/andrej_vinogradov/", languages: ["ru", "en", "lt"], equipment: [ATEM_4, ATEM_2, STREAM_DECK], cases: ["iem-masters-cologne", "corgi-race-vilnius-2025-stream", "esports-community-casts", "ewc-2026-paris"] },
  { slug: "patrik-lissovenko", name: "Patrik Lissovenko", roles: ["camera", "vision"], city: "Tallinn", instagram: "https://www.instagram.com/patrik.lissovenko/", languages: ["ru", "en", "et"], equipment: [URSA_G2, URSA_12K, FUJINON], cases: ["fiba-3x3-split-challenger-tournament-broadcasting"] },
];

export const CASE_NAMES: Record<string, string> = {
  "corgi-race-vilnius-2025-stream": "Corgi Race Vilnius 2025 Stream",
  "corgi-race-vilnius-2026": "Corgi Race Vilnius 2026",
  "esports-community-casts": "Esports Community Casts",
  "ewc-2025-additional-languages-streams": "EWC 2025 Additional Language Streams",
  "ewc-2026-paris": "EWC 2026 Paris",
  "fiba-3x3-split-challenger-tournament-broadcasting": "FIBA 3x3 Split Challenger",
  "gurtam-commercial-production-service": "GURTAM Commercial",
  "iem-masters-cologne": "IEM Masters Cologne",
  "mozzart-bet-super-liga-ar-graphics": "Mozzart Bet Super Liga AR Graphics",
  "nested-lands-game-teaser-trailer": "Nested Lands Game Teaser Trailer",
  "primera-federacion-broadcasting": "Primera Federación Broadcasting",
  "poerator-crew-at-starladder-starseries-19": "Starladder StarSeries 19",
  "video-production-for-xm-textiles": "Video Production for XM Textiles",
};

export const PROJECT_LEAD = TEAM[0];
export const TEAM_CITIES = ["Vilnius", "Paris", "Tallinn"];

export const TEAM_LABELS: Record<string, L> = {
  team: { en: "Team", de: "Team", fr: "Équipe", pl: "Zespół", lt: "Komanda" },
  company: { en: "Company", de: "Unternehmen", fr: "Entreprise", pl: "Firma", lt: "Įmonė" },
  activity: { en: "Activity", de: "Tätigkeit", fr: "Activité", pl: "Działalność", lt: "Veikla" },
  markets: { en: "Markets", de: "Märkte", fr: "Marchés", pl: "Rynki", lt: "Rinkos" },
  teamSize: { en: "Team size", de: "Teamgröße", fr: "Taille de l'équipe", pl: "Wielkość zespołu", lt: "Komandos dydis" },
  locations: { en: "Locations", de: "Standorte", fr: "Sites", pl: "Lokalizacje", lt: "Vietos" },
  production: { en: "Production", de: "Produktion", fr: "Production", pl: "Produkcja", lt: "Produkcija" },
  technical: { en: "Technical", de: "Technik", fr: "Technique", pl: "Technika", lt: "Technika" },
  camera: { en: "Camera", de: "Kamera", fr: "Caméra", pl: "Kamera", lt: "Kamera" },
  vision: { en: "Vision and replay", de: "Bildmischung und Replay", fr: "Mixage image et replay", pl: "Realizacja i replay", lt: "Vaizdo miksavimas ir pakartojimai" },
  role: { en: "Role", de: "Rolle", fr: "Rôle", pl: "Rola", lt: "Vaidmuo" },
  responsibility: { en: "Responsibility area", de: "Verantwortungsbereich", fr: "Domaine de responsabilité", pl: "Zakres odpowiedzialności", lt: "Atsakomybės sritis" },
  specialisation: { en: "Equipment specialisation", de: "Gerätespezialisierung", fr: "Spécialisation matériel", pl: "Specjalizacja sprzętowa", lt: "Įrangos specializacija" },
  projects: { en: "Projects worked on", de: "Projekte", fr: "Projets réalisés", pl: "Realizowane projekty", lt: "Dalyvauta projektuose" },
  location: { en: "Location", de: "Standort", fr: "Lieu", pl: "Lokalizacja", lt: "Vieta" },
  languages: { en: "Languages", de: "Sprachen", fr: "Langues", pl: "Języki", lt: "Kalbos" },
  quoteRequests: { en: "Quote requests", de: "Angebotsanfragen", fr: "Demandes de devis", pl: "Zapytania ofertowe", lt: "Kainų užklausos" },
  equipment: { en: "Equipment", de: "Ausrüstung", fr: "Équipement", pl: "Sprzęt", lt: "Įranga" },
  portfolio: { en: "Portfolio", de: "Portfolio", fr: "Portfolio", pl: "Portfolio", lt: "Projektai" },
  projectLead: { en: "Project lead", de: "Projektleiter", fr: "Chef de projet", pl: "Kierownik projektu", lt: "Projekto vadovas" },
};

export const ROLE_LABELS: Record<ArchetypeKey, L> = {
  producer: { en: "Producer / project lead", de: "Produzent / Projektleiter", fr: "Producteur / chef de projet", pl: "Producent / kierownik projektu", lt: "Prodiuseris / projekto vadovas" },
  technical: { en: "OB van operator / technical director", de: "OB-Van-Operator / Technischer Direktor", fr: "Opérateur car-régie / directeur technique", pl: "Operator wozu transmisyjnego / dyrektor techniczny", lt: "OB furgono operatorius / technikos direktorius" },
  camera: { en: "Camera operator", de: "Kameramann", fr: "Cadreur", pl: "Operator kamery", lt: "Kameros operatorius" },
  vision: { en: "Vision mixer / replay operator", de: "Bildmischer / Replay-Operator", fr: "Mixeur vidéo / opérateur replay", pl: "Realizator obrazu / operator replay", lt: "Vaizdo miksuotojas / pakartojimų operatorius" },
};

export const RESPONSIBILITY: Record<ArchetypeKey, Record<Locale, string[]>> = {
  producer: {
    en: ["Project scope", "schedule", "crew", "client contact", "delivery"],
    de: ["Projektumfang", "Zeitplan", "Crew", "Kundenkontakt", "Lieferung"],
    fr: ["Périmètre du projet", "planning", "équipe", "contact client", "livraison"],
    pl: ["Zakres projektu", "harmonogram", "ekipa", "kontakt z klientem", "dostawa"],
    lt: ["Projekto apimtis", "grafikas", "komanda", "ryšys su klientu", "pristatymas"],
  },
  technical: {
    en: ["OB van configuration", "signal flow", "camera shading", "technical crew coordination"],
    de: ["OB-Van-Konfiguration", "Signalfluss", "Kamera-Shading", "Koordination der technischen Crew"],
    fr: ["Configuration du car-régie", "flux de signaux", "shading des caméras", "coordination de l'équipe technique"],
    pl: ["Konfiguracja wozu transmisyjnego", "przepływ sygnału", "shading kamer", "koordynacja ekipy technicznej"],
    lt: ["OB furgono konfigūracija", "signalo srautas", "kamerų šeidingas", "techninės komandos koordinavimas"],
  },
  camera: {
    en: ["Camera position", "framing", "lens selection", "camera movement"],
    de: ["Kameraposition", "Bildausschnitt", "Objektivwahl", "Kamerabewegung"],
    fr: ["Position de la caméra", "cadrage", "choix des objectifs", "mouvement de caméra"],
    pl: ["Pozycja kamery", "kadrowanie", "dobór obiektywów", "ruch kamery"],
    lt: ["Kameros pozicija", "kadravimas", "objektyvų pasirinkimas", "kameros judėjimas"],
  },
  vision: {
    en: ["Programme cut", "replay selection", "graphics playback", "stream switching"],
    de: ["Programmschnitt", "Replay-Auswahl", "Grafikwiedergabe", "Stream-Umschaltung"],
    fr: ["Montage du programme", "sélection des replays", "lecture des graphismes", "commutation des flux"],
    pl: ["Realizacja programu", "wybór powtórek", "odtwarzanie grafik", "przełączanie streamów"],
    lt: ["Programos montažas", "pakartojimų atranka", "grafikos paleidimas", "srautų perjungimas"],
  },
};

export const LANGUAGE_NAMES: Record<LanguageKey, L> = {
  ru: { en: "Russian", de: "Russisch", fr: "russe", pl: "rosyjski", lt: "rusų" },
  en: { en: "English", de: "Englisch", fr: "anglais", pl: "angielski", lt: "anglų" },
  lt: { en: "Lithuanian", de: "Litauisch", fr: "lituanien", pl: "litewski", lt: "lietuvių" },
  fr: { en: "French", de: "Französisch", fr: "français", pl: "francuski", lt: "prancūzų" },
  et: { en: "Estonian", de: "Estnisch", fr: "estonien", pl: "estoński", lt: "estų" },
};

export const TEAM_SECTIONS: { heading: string; role: ArchetypeKey }[] = [
  { heading: "production", role: "producer" },
  { heading: "technical", role: "technical" },
  { heading: "camera", role: "camera" },
  { heading: "vision", role: "vision" },
];
