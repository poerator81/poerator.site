import type { Locale } from "@/i18n";

export type LocaleText = Record<Locale, string>;
export type Text = string | LocaleText;
export type KitPart = Text | { equipment: { category: string; slug: string } } | { link: string; text: Text };
export type ResultLabel =
  | "output" | "delivery" | "audience" | "duration" | "client" | "languages"
  | "scope" | "peakAudience" | "events" | "ar" | "use" | "partner";

export type CaseContent = {
  header: {
    project: Text; format: Text; venue?: Text; crew?: Text; date?: Text; dates?: Text; client?: Text;
    team?: string[]; scope?: Text[]; deliverables?: Text[]; deliverablesNote?: Text;
  };
  plainRelated?: boolean;
  summaryFromHeader?: boolean;
  challenge?: Text;
  kit?: KitPart[][];
  constraints?: Text[];
  result?: { label: ResultLabel; value: Text }[];
  narrative?: Text;
  seoTitle: Text;
  seoDescription: Text;
};

const x = (en: string, de: string, fr: string, pl: string, lt: string): LocaleText => ({ en, de, fr, pl, lt });

export function resolveText(value: Text, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}

export const CASE_LABELS: Record<string, LocaleText> = {
  project: x("Project", "Projekt", "Projet", "Projekt", "Projektas"),
  format: x("Format", "Format", "Format", "Format", "Formatas"),
  venue: x("Venue", "Ort", "Lieu", "Miejsce", "Vieta"),
  crew: x("Crew", "Team", "Équipe", "Ekipa", "Komanda"),
  date: x("Date", "Datum", "Date", "Data", "Data"),
  dates: x("Dates", "Termine", "Dates", "Terminy", "Datos"),
  team: x("Team on site", "Team vor Ort", "Équipe sur place", "Zespół na miejscu", "Komanda vietoje"),
  deliverables: x("Deliverables", "Leistungen", "Livrables", "Zakres dostaw", "Pristatomi darbai"),
  challenge: x("Challenge", "Herausforderung", "Enjeu", "Wyzwanie", "Iššūkis"),
  kit: x("Kit used", "Eingesetzte Technik", "Matériel utilisé", "Użyty sprzęt", "Naudota įranga"),
  constraints: x("Constraints", "Rahmenbedingungen", "Contraintes", "Ograniczenia", "Apribojimai"),
  result: x("Result", "Ergebnis", "Résultat", "Rezultat", "Rezultatas"),
  summary: x("Summary", "Zusammenfassung", "Synthèse", "Opis", "Santrauka"),
  output: x("Output", "Ergebnis (Output)", "Livrable", "Efekt", "Rezultatas (Output)"),
  delivery: x("Delivery", "Auslieferung", "Diffusion", "Dostawa", "Pateikimas"),
  audience: x("Audience", "Publikum", "Audience", "Widownia", "Auditorija"),
  duration: x("Duration", "Dauer", "Durée", "Czas trwania", "Trukmė"),
  client: x("Client", "Kunde", "Client", "Klient", "Klientas"),
  languages: x("Languages", "Sprachen", "Langues", "Języki", "Kalbos"),
  scope: x("Scope", "Umfang", "Périmètre", "Zakres", "Apimtis"),
  peakAudience: x("Peak audience", "Spitzenpublikum", "Pic d'audience", "Szczytowa widownia", "Didžiausia auditorija"),
  events: x("Events", "Veranstaltungen", "Événements", "Wydarzenia", "Renginiai"),
  ar: x("AR", "AR", "AR", "AR", "AR"),
  use: x("Use", "Einsatz", "Usage", "Zastosowanie", "Naudojimas"),
  partner: x("Partner", "Partner", "Partenaire", "Partner", "Partneris"),
};

const atem = { equipment: { category: "switching-control", slug: "atem-4-m-e-constellation-4k" } };
const ursaG2 = { equipment: { category: "cameras", slug: "blackmagic-ursa-broadcast-g2" } };
const solidcom = { equipment: { category: "audio-comms", slug: "hollyland-solidcom-c1-pro-8s" } };

export const CASE_CONTENT: Record<string, CaseContent> = {
  "corgi-race-vilnius-2025-stream": {
    header: {
      project: "Corgi Race Vilnius 2025 Stream",
      format: x("Live stream", "Livestream", "Diffusion en direct", "Transmisja na żywo", "Tiesioginė transliacija"),
      venue: "Vingis Park, Vilnius",
      crew: "14",
      date: x("25 July 2025", "25. Juli 2025", "25 juillet 2025", "25 lipca 2025", "2025 m. liepos 25 d."),
    },
    challenge: x("Build-up on the day of the event", "Aufbau am Veranstaltungstag", "Montage le jour de l'événement", "Montaż w dniu wydarzenia", "Montavimas renginio dieną"),
    kit: [
      [x("10x Blackmagic PYXIS camera", "10x Blackmagic PYXIS Kamera", "10x caméra Blackmagic PYXIS", "10x kamera Blackmagic PYXIS", "10x Blackmagic PYXIS kamera")],
      ["Canon 24-70 ", x("lens", "Objektiv", "objectif", "obiektyw", "objektyvas")],
      ["Canon 70-200 ", x("lens", "Objektiv", "objectif", "obiektyw", "objektyvas")],
      [atem],
      [solidcom, x(" intercom", " Intercom", " (interphone)", " (intercom)", " (ryšio sistema)")],
      [x("In-house graphics servers", "Eigene Grafikserver", "Serveurs graphiques internes", "Własne serwery grafiki", "Nuosavi grafikos serveriai")],
    ],
    constraints: [
      x("Build-up took place on the day of the event", "Aufbau am Veranstaltungstag", "Montage réalisé le jour de l'événement", "Montaż odbył się w dniu wydarzenia", "Montavimas vyko renginio dieną"),
      x("SDI and wireless signal paths", "SDI- und Funk-Signalwege", "Chemins de signal SDI et sans fil", "Ścieżki sygnału SDI i bezprzewodowe", "SDI ir belaidžiai signalo keliai"),
    ],
    narrative: x(
      "Live broadcast of the Corgi Race in Vingis Park, Vilnius, 25 July 2025. Ten cameras. Crew of 14. ATEM 4 M/E Constellation 4K switching, SDI and wireless signal paths, in-house graphics servers. Build-up took place on the day of the event. Producer: Poerator. Client: Corgi Race Vilnius.",
      "Live-Übertragung des Corgi Race im Vingis-Park, Vilnius, 25. Juli 2025. Zehn Kameras. Team aus 14 Personen. ATEM 4 M/E Constellation 4K als Bildmischer, SDI- und Funk-Signalwege, eigene Grafikserver. Aufbau am Veranstaltungstag. Produzent: Poerator. Kunde: Corgi Race Vilnius.",
      "Diffusion en direct de la Corgi Race au parc Vingis, Vilnius, 25 juillet 2025. Dix caméras. Équipe de 14 personnes. Mélange ATEM 4 M/E Constellation 4K, chemins de signal SDI et sans fil, serveurs graphiques internes. Montage réalisé le jour de l'événement. Producteur : Poerator. Client : Corgi Race Vilnius.",
      "Transmisja na żywo Corgi Race w parku Vingis w Wilnie, 25 lipca 2025. Dziesięć kamer. Ekipa 14 osób. Mikser ATEM 4 M/E Constellation 4K, ścieżki sygnału SDI i bezprzewodowe, własne serwery grafiki. Montaż w dniu wydarzenia. Producent: Poerator. Klient: Corgi Race Vilnius.",
      "Tiesioginė „Corgi Race“ transliacija Vingio parke, Vilniuje, 2025 m. liepos 25 d. Dešimt kamerų. 14 žmonių komanda. ATEM 4 M/E Constellation 4K maišymas, SDI ir belaidžiai signalo keliai, nuosavi grafikos serveriai. Montavimas vyko renginio dieną. Gamintojas: Poerator. Klientas: Corgi Race Vilnius.",
    ),
    seoTitle: x(
      "Corgi Race Vilnius 2025 | Live Stream | Poerator",
      "Corgi Race Vilnius 2025 | Livestream | Poerator",
      "Corgi Race Vilnius 2025 | Direct | Poerator",
      "Corgi Race Vilnius 2025 | Transmisja | Poerator",
      "Corgi Race Vilnius 2025 | Transliacija | Poerator",
    ),
    seoDescription: x(
      "Corgi Race Vilnius 2025: live stream from Vingis Park. 10 cameras, crew of 14, ATEM 4 M/E. Production by Poerator.",
      "Corgi Race Vilnius 2025: Livestream aus dem Vingis-Park. 10 Kameras, 14 Personen, ATEM 4 M/E. Produktion von Poerator.",
      "Corgi Race Vilnius 2025 : diffusion en direct du parc Vingis. 10 caméras, équipe de 14, ATEM 4 M/E. Production Poerator.",
      "Corgi Race Vilnius 2025: transmisja na żywo z parku Vingis. 10 kamer, ekipa 14 osób, ATEM 4 M/E. Produkcja Poerator.",
      "Corgi Race Vilnius 2025: tiesioginė transliacija iš Vingio parko. 10 kamerų, 14 žmonių, ATEM 4 M/E. Gamina Poerator.",
    ),
  },

  "primera-federacion-broadcasting": {
    header: {
      project: "Primera Federación Broadcasting",
      format: x("Football league broadcast", "Übertragung einer Fußballliga", "Diffusion d'un championnat de football", "Transmisja rozgrywek piłkarskich", "Futbolo lygos transliacija"),
      venue: x("40 stadiums", "40 Stadien", "40 stades", "40 stadionów", "40 stadionų"),
      crew: x("8-10 per match", "8–10 pro Spiel", "8 à 10 par match", "8–10 na mecz", "8–10 per rungtynes"),
      date: x("Season 2022-2023", "Saison 2022–2023", "Saison 2022-2023", "Sezon 2022-2023", "2022–2023 m. sezonas"),
    },
    challenge: x("20 matches per weekend across 40 stadiums", "20 Spiele pro Wochenende in 40 Stadien", "20 matchs par week-end dans 40 stades", "20 meczów w weekend w 40 stadionach", "20 rungtynių per savaitgalį 40 stadionų"),
    kit: [
      [x("4x Sony Z150 camera per match", "4x Sony Z150 Kamera pro Spiel", "4x caméra Sony Z150 par match", "4x kamera Sony Z150 na mecz", "4x Sony Z150 kamera per rungtynes")],
      ["vMix ", x("server", "Server", "serveur", "serwer", "serveris")],
      [x("LiveU transmission", "LiveU-Übertragung", "Transmission LiveU", "Transmisja LiveU", "LiveU perdavimas")],
      [x("In-house graphics with statistics", "Eigene Grafiken mit Statistiken", "Graphismes internes avec statistiques", "Własna grafika ze statystykami", "Nuosavi grafikos sprendimai su statistika")],
    ],
    constraints: [
      x("20 broadcasts per weekend", "20 Übertragungen pro Wochenende", "20 diffusions par week-end", "20 transmisji w weekend", "20 transliacijų per savaitgalį"),
      x("15 crews recruited and trained in one month", "15 Teams in einem Monat rekrutiert und geschult", "15 équipes recrutées et formées en un mois", "15 ekip zrekrutowanych i przeszkolonych w miesiąc", "15 komandų surinkta ir apmokyta per mėnesį"),
    ],
    result: [
      { label: "output", value: x("about 1,500 streams", "rund 1.500 Streams", "environ 1 500 flux", "około 1500 streamów", "apie 1 500 transliacijų") },
      { label: "delivery", value: x("OTT platform", "OTT-Plattform", "Plateforme OTT", "Platforma OTT", "OTT platforma") },
      { label: "client", value: "RFEF" },
    ],
    narrative: x(
      "Primera Federacion broadcast for RFEF, season 2022-2023. 40 stadiums, 20 matches per weekend, about 1,500 streams. Four Sony Z150 cameras per match, crew of 8 to 10, vMix server, LiveU transmission, in-house statistics graphics, OTT delivery. 15 crews recruited and trained in one month.",
      "Primera Federación für RFEF, Saison 2022–2023. 40 Stadien, 20 Spiele pro Wochenende, rund 1.500 Streams. Vier Sony Z150 Kameras pro Spiel, Team aus 8 bis 10 Personen, vMix-Server, LiveU-Übertragung, eigene Statistikgrafiken, OTT-Auslieferung. 15 Teams in einem Monat rekrutiert und geschult.",
      "Primera Federación pour la RFEF, saison 2022-2023. 40 stades, 20 matchs par week-end, environ 1 500 flux. Quatre caméras Sony Z150 par match, équipe de 8 à 10 personnes, serveur vMix, transmission LiveU, graphismes statistiques internes, diffusion OTT. 15 équipes recrutées et formées en un mois.",
      "Primera Federación dla RFEF, sezon 2022-2023. 40 stadionów, 20 meczów w weekend, około 1500 streamów. Cztery kamery Sony Z150 na mecz, ekipa 8–10 osób, serwer vMix, transmisja LiveU, własna grafika statystyczna, dostawa OTT. 15 ekip zrekrutowanych i przeszkolonych w miesiąc.",
      "„Primera Federación“ RFEF užsakymu, 2022–2023 m. sezonas. 40 stadionų, 20 rungtynių per savaitgalį, apie 1 500 transliacijų. Keturios Sony Z150 kameros per rungtynes, 8–10 žmonių komanda, vMix serveris, LiveU perdavimas, nuosava statistikos grafika, OTT pateikimas. 15 komandų surinkta ir apmokyta per mėnesį.",
    ),
    seoTitle: x(
      "Primera Federación Broadcasting | Football | Poerator",
      "Primera Federación Übertragung | Fußball | Poerator",
      "Primera Federación Diffusion | Football | Poerator",
      "Primera Federación Transmisje | Piłka | Poerator",
      "Primera Federación transliacijos | Futbolas | Poerator",
    ),
    seoDescription: x(
      "Primera Federacion broadcast for RFEF: 40 stadiums, 20 matches per weekend, 4 cameras per match, about 1,500 streams. Poerator.",
      "Primera Federación für RFEF: 40 Stadien, 20 Spiele pro Wochenende, 4 Kameras pro Spiel, rund 1.500 Streams. Poerator.",
      "Primera Federación pour la RFEF : 40 stades, 20 matchs par week-end, 4 caméras par match, environ 1 500 flux. Poerator.",
      "Primera Federación dla RFEF: 40 stadionów, 20 meczów w weekend, 4 kamery na mecz, około 1500 streamów. Poerator.",
      "Primera Federación RFEF užsakymu: 40 stadionų, 20 rungtynių per savaitgalį, 4 kameros per rungtynes, apie 1 500 transliacijų. Poerator.",
    ),
  },

  "corgi-race-vilnius-2026": {
    header: {
      project: "Corgi Race Vilnius 2026",
      format: x("Live broadcast, 2 language streams", "Live-Übertragung, 2 Sprachstreams", "Diffusion en direct, 2 flux linguistiques", "Transmisja na żywo, 2 strumienie językowe", "Tiesioginė transliacija, 2 kalbų srautai"),
      venue: "Vilnius",
      crew: "15",
      date: x("17 August 2026", "17. August 2026", "17 août 2026", "17 sierpnia 2026", "2026 m. rugpjūčio 17 d."),
    },
    challenge: x(
      "Custom project on a complex site: camera positions for drone and radio-controlled car camera that do not frighten the dogs",
      "Individuelles Projekt auf schwierigem Gelände: Kamerapositionen für Drohne und ferngesteuerte Auto-Kamera, die die Hunde nicht erschrecken",
      "Projet sur mesure sur un site complexe : positions de caméra pour drone et caméra sur voiture télécommandée qui n'effraient pas les chiens",
      "Projekt na wymagającym terenie: pozycje kamer dla drona i kamery na samochodzie zdalnie sterowanym, które nie płoszą psów",
      "Individualus projektas sudėtingoje vietoje: dronų ir radijo bangomis valdomo automobilio kameros pozicijos, kurios negąsdina šunų",
    ),
    kit: [
      ["10x ", x("camera channel", "Kamerakanal", "canal caméra", "kanał kamerowy", "kameros kanalas"), ": ", ursaG2, ", DJI 4D, Fujinon ", x("lenses (various)", "Objektive (verschiedene)", "objectifs (divers)", "obiektywy (różne)", "objektyvai (įvairūs)")],
      [atem],
      ["Starlink"],
    ],
    constraints: [
      x("Drone and radio-controlled car camera near dogs", "Drohne und ferngesteuerte Auto-Kamera in der Nähe der Hunde", "Drone et caméra sur voiture télécommandée près des chiens", "Dron i kamera na samochodzie zdalnie sterowanym w pobliżu psów", "Dronas ir radijo bangomis valdomo automobilio kamera šalia šunų"),
      x("2 separate streams from 1 graphics pack", "2 getrennte Streams aus 1 Grafikpaket", "2 flux distincts à partir d'1 pack graphique", "2 oddzielne streamy z 1 pakietu grafiki", "2 atskiri srautai iš 1 grafikos paketo"),
      x("2 commentary positions on site, 1 sideline commentator in the Lithuanian stream", "2 Kommentatorenplätze vor Ort, 1 Seitenlinien-Kommentator im litauischen Stream", "2 postes de commentaire sur site, 1 commentateur en bord de terrain dans le flux lituanien", "2 stanowiska komentatorskie na miejscu, 1 komentator przy linii boiska w streamie litewskim", "2 komentatorių vietos vietoje, 1 komentatorius prie aikštelės krašto lietuviškame sraute"),
    ],
    result: [
      { label: "delivery", value: x("FOX News (English), LNK (Lithuanian)", "FOX News (Englisch), LNK (Litauisch)", "FOX News (anglais), LNK (lituanien)", "FOX News (angielski), LNK (litewski)", "FOX News (anglų k.), LNK (lietuvių k.)") },
    ],
    narrative: x(
      "Live broadcast of the Corgi Race, Vilnius, 17 August 2026. Ten camera channels, including a drone and a radio-controlled car camera. Crew of 15. ATEM 4 M/E Constellation 4K, Starlink uplink. Two separate streams from one graphics pack: English for FOX News, Lithuanian for LNK. Two commentary positions on site, plus a sideline commentator in the Lithuanian stream.",
      "Live-Übertragung des Corgi Race, Vilnius, 17. August 2026. Zehn Kamerakanäle, darunter eine Drohne und eine Kamera auf einem ferngesteuerten Auto. Team aus 15 Personen. ATEM 4 M/E Constellation 4K, Starlink-Uplink. Zwei getrennte Streams aus einem Grafikpaket: Englisch für FOX News, Litauisch für LNK. Zwei Kommentatorenplätze vor Ort, dazu ein Seitenlinien-Kommentator im litauischen Stream.",
      "Diffusion en direct de la Corgi Race, Vilnius, 17 août 2026. Dix canaux caméra, dont un drone et une caméra sur voiture télécommandée. Équipe de 15 personnes. ATEM 4 M/E Constellation 4K, liaison montante Starlink. Deux flux distincts à partir d'un pack graphique : anglais pour FOX News, lituanien pour LNK. Deux postes de commentaire sur site, plus un commentateur en bord de terrain dans le flux lituanien.",
      "Transmisja na żywo Corgi Race w Wilnie, 17 sierpnia 2026. Dziesięć kanałów kamerowych, w tym dron i kamera na samochodzie zdalnie sterowanym. Ekipa 15 osób. ATEM 4 M/E Constellation 4K, łącze Starlink. Dwa oddzielne streamy z jednego pakietu grafiki: angielski dla FOX News, litewski dla LNK. Dwa stanowiska komentatorskie na miejscu oraz komentator przy linii boiska w streamie litewskim.",
      "Tiesioginė „Corgi Race“ transliacija Vilniuje, 2026 m. rugpjūčio 17 d. Dešimt kameros kanalų, tarp jų dronas ir radijo bangomis valdomo automobilio kamera. 15 žmonių komanda. ATEM 4 M/E Constellation 4K, Starlink ryšys. Du atskiri srautai iš vieno grafikos paketo: anglų kalba FOX News, lietuvių kalba LNK. Dvi komentatorių vietos renginyje ir komentatorius prie aikštelės krašto lietuviškame sraute.",
    ),
    seoTitle: x(
      "Corgi Race Vilnius 2026 | Live Broadcast | Poerator",
      "Corgi Race Vilnius 2026 | Live-Übertragung | Poerator",
      "Corgi Race Vilnius 2026 | Direct | Poerator",
      "Corgi Race Vilnius 2026 | Transmisja | Poerator",
      "Corgi Race Vilnius 2026 | Transliacija | Poerator",
    ),
    seoDescription: x(
      "Corgi Race Vilnius 2026: live broadcast. 10 camera channels, 2 streams: FOX News (English), LNK (Lithuanian). Production by Poerator.",
      "Corgi Race Vilnius 2026: Live-Übertragung. 10 Kamerakanäle, 2 Streams: FOX News (Englisch), LNK (Litauisch). Produktion von Poerator.",
      "Corgi Race Vilnius 2026 : diffusion en direct. 10 canaux caméra, 2 flux : FOX News (anglais), LNK (lituanien). Production Poerator.",
      "Corgi Race Vilnius 2026: transmisja na żywo. 10 kanałów kamerowych, 2 streamy: FOX News (ang.), LNK (lit.). Produkcja Poerator.",
      "Corgi Race Vilnius 2026: tiesioginė transliacija. 10 kameros kanalų, 2 srautai: FOX News (anglų), LNK (lietuvių). Gamina Poerator.",
    ),
  },

  "esports-community-casts": {
    header: {
      project: "Esports Community Casts",
      format: x("Community cast", "Community-Cast", "Community cast", "Community cast", "Bendruomenės transliacija"),
      venue: "Birmingham, Cologne, Belgrade, Krakow",
      crew: x("6-20 per event", "6–20 pro Veranstaltung", "6 à 20 par événement", "6–20 na wydarzenie", "6–20 per renginį"),
      date: x("Last 2 years", "Letzte 2 Jahre", "2 dernières années", "Ostatnie 2 lata", "Paskutiniai 2 metai"),
    },
    challenge: x(
      "Creative tasks fitted to the equipment that fits the venue",
      "Kreative Aufgaben, abgestimmt auf die Technik, die zum Veranstaltungsort passt",
      "Missions créatives adaptées au matériel qui convient au lieu",
      "Zadania kreatywne dopasowane do sprzętu, który pasuje do miejsca",
      "Kūrybinės užduotys, pritaikytos prie vietai tinkamos įrangos",
    ),
    kit: [
      [x("Full control rooms", "Komplette Regieräume", "Régies complètes", "Pełne reżyserki", "Pilnos transliacijų valdymo patalpos")],
      [atem],
      [x("Camera control", "Kamerasteuerung", "Contrôle caméra", "Sterowanie kamerami", "Kamerų valdymas")],
      [x("Audio mixers", "Audiomischer", "Mélangeurs audio", "Miksery audio", "Garso mikšeriai")],
      [x("Dedicated fibre internet", "Dedizierter Glasfaser-Internetzugang", "Internet fibre dédié", "Dedykowany internet światłowodowy", "Dedikuotas šviesolaidinis internetas")],
    ],
    constraints: [
      x("Different venue for each cast", "Jeweils anderer Veranstaltungsort pro Cast", "Un lieu différent pour chaque cast", "Inne miejsce dla każdego castu", "Kiekvienai transliacijai skirtinga vieta"),
      x("2-3 casts per city", "2–3 Casts pro Stadt", "2 à 3 casts par ville", "2–3 casty w każdym mieście", "2–3 transliacijos kiekviename mieste"),
    ],
    result: [
      { label: "output", value: x("20+ casts", "20+ Casts", "20+ casts", "20+ castów", "20+ transliacijų") },
      { label: "audience", value: x("500,000+ total viewers", "500.000+ Zuschauer insgesamt", "500 000+ spectateurs au total", "500 000+ widzów łącznie", "500 000+ žiūrovų iš viso") },
      { label: "events", value: "IEM Cologne 2025 and 2026, ESL One Birmingham, IEM Krakow, PGL Cluj-Napoca, Fissure Playground 1 and 2, EWC 2025 Dota 2" },
    ],
    narrative: x(
      "Esports community casts in CS2 and Dota 2. More than 20 casts in two years. Events: IEM Cologne 2025 and 2026, ESL One Birmingham, IEM Krakow, PGL Cluj-Napoca, Fissure Playground 1 and 2, EWC 2025 Dota 2. Crew of 6 to 20 per event. Full control rooms: ATEM, camera control, audio mixers. Dedicated fibre internet. Combined viewership: more than 500,000.",
      "Esports-Community-Casts in CS2 und Dota 2. Mehr als 20 Casts in zwei Jahren. Veranstaltungen: IEM Cologne 2025 und 2026, ESL One Birmingham, IEM Krakow, PGL Cluj-Napoca, Fissure Playground 1 und 2, EWC 2025 Dota 2. Team aus 6 bis 20 Personen pro Veranstaltung. Komplette Regieräume: ATEM, Kamerasteuerung, Audiomischer. Dedizierter Glasfaser-Internetzugang. Gesamtreichweite: mehr als 500.000.",
      "Community casts esport en CS2 et Dota 2. Plus de 20 casts en deux ans. Événements : IEM Cologne 2025 et 2026, ESL One Birmingham, IEM Krakow, PGL Cluj-Napoca, Fissure Playground 1 et 2, EWC 2025 Dota 2. Équipe de 6 à 20 personnes par événement. Régies complètes : ATEM, contrôle caméra, mélangeurs audio. Internet fibre dédié. Audience cumulée : plus de 500 000.",
      "Community casty esportowe w CS2 i Dota 2. Ponad 20 castów w dwa lata. Wydarzenia: IEM Cologne 2025 i 2026, ESL One Birmingham, IEM Krakow, PGL Cluj-Napoca, Fissure Playground 1 i 2, EWC 2025 Dota 2. Ekipa 6–20 osób na wydarzenie. Pełne reżyserki: ATEM, sterowanie kamerami, miksery audio. Dedykowany internet światłowodowy. Łączna widownia: ponad 500 000.",
      "E. sporto bendruomenių transliacijos CS2 ir Dota 2. Daugiau nei 20 transliacijų per dvejus metus. Renginiai: IEM Cologne 2025 ir 2026, ESL One Birmingham, IEM Krakow, PGL Cluj-Napoca, Fissure Playground 1 ir 2, EWC 2025 Dota 2. 6–20 žmonių komanda per renginį. Pilnos valdymo patalpos: ATEM, kamerų valdymas, garso mikšeriai. Dedikuotas šviesolaidinis internetas. Bendra auditorija: daugiau nei 500 000.",
    ),
    seoTitle: x(
      "Esports Community Casts | CS2, Dota 2 | Poerator",
      "Esports Community Casts | CS2, Dota 2 | Poerator",
      "Casts communautaires esport | CS2, Dota 2 | Poerator",
      "Esportowe community casty | CS2, Dota 2 | Poerator",
      "E. sporto transliacijos | CS2, Dota 2 | Poerator",
    ),
    seoDescription: x(
      "Esports community casts: 20+ casts in 2 years. CS2 and Dota 2. IEM Cologne, ESL One Birmingham, IEM Krakow. 500,000+ viewers. Poerator.",
      "Esports-Community-Casts: 20+ Casts in 2 Jahren. CS2 und Dota 2. IEM Cologne, ESL One Birmingham, IEM Krakow. 500.000+ Zuschauer. Poerator.",
      "Casts communautaires esport : 20+ casts en 2 ans. CS2 et Dota 2. IEM Cologne, ESL One Birmingham, IEM Krakow. 500 000+ spectateurs. Poerator.",
      "Esportowe community casty: 20+ castów w 2 lata. CS2 i Dota 2. IEM Cologne, ESL One Birmingham, IEM Krakow. 500 000+ widzów. Poerator.",
      "E. sporto bendruomenių transliacijos: 20+ per 2 metus. CS2 ir Dota 2. IEM Cologne, ESL One Birmingham, IEM Krakow. 500 000+ žiūrovų. Poerator.",
    ),
  },

  "ewc-2025-additional-languages-streams": {
    header: {
      project: "Esports World Cup 2025, Additional Language Streams",
      format: x("Esports tournament streams", "E-Sport-Turnierstreams", "Streams de tournoi d'esport", "Streamy turniejowe esportu", "E. sporto turnyro transliacijos"),
      venue: x("Riyadh, Saudi Arabia", "Riyadh, Saudi-Arabien", "Riyadh, Arabie saoudite", "Riyadh, Arabia Saudyjska", "Riyadh, Saudo Arabija"),
      crew: x("4 crews", "4 Teams", "4 équipes", "4 ekipy", "4 komandos"),
      date: x("July-August 2025", "Juli–August 2025", "Juillet-août 2025", "Lipiec–sierpień 2025", "2025 m. liepa–rugpjūtis"),
    },
    challenge: x("Turnkey streams in 3 additional languages", "Schlüsselfertige Streams in 3 zusätzlichen Sprachen", "Flux clés en main dans 3 langues supplémentaires", "Streamy pod klucz w 3 dodatkowych językach", "Pilno ciklo transliacijos 3 papildomomis kalbomis"),
    kit: [
      [atem],
      [ursaG2],
      [{ equipment: { category: "cameras", slug: "blackmagic-micro-studio-camera-4k-g2" } }],
    ],
    constraints: [
      x("2 months on site", "2 Monate vor Ort", "2 mois sur site", "2 miesiące na miejscu", "2 mėnesiai vietoje"),
      x("Heat", "Hitze", "Chaleur", "Upał", "Karštis"),
    ],
    result: [
      { label: "languages", value: x("Arabic, Indonesian, Filipino", "Arabisch, Indonesisch, Filipino", "arabe, indonésien, filipino", "arabski, indonezyjski, filipiński", "arabų, indoneziečių, filipiniečių") },
      { label: "scope", value: x("commentary studios, analysis studios, turnkey stream production", "Kommentatorenstudios, Analysestudios, schlüsselfertige Streamproduktion", "studios de commentaire, studios d'analyse, production de flux clé en main", "studia komentatorskie, studia analityczne, produkcja streamów pod klucz", "komentatorių studijos, analizės studijos, pilno ciklo transliacijų gamyba") },
      { label: "peakAudience", value: x("700,000 viewers", "700.000 Zuschauer", "700 000 spectateurs", "700 000 widzów", "700 000 žiūrovų") },
    ],
    narrative: x(
      "Esports World Cup 2025, Riyadh, July to August. Additional language streams in Arabic, Indonesian and Filipino. Four crews on site for two months. Scope: commentary studios, analysis studios, turnkey stream production. Kit: ATEM 4 M/E Constellation 4K, Blackmagic URSA Broadcast G2, Micro Studio Camera 4K G2. Peak audience: 700,000 viewers.",
      "Esports World Cup 2025, Riyadh, Juli bis August. Zusätzliche Sprachstreams in Arabisch, Indonesisch und Filipino. Vier Teams zwei Monate vor Ort. Umfang: Kommentatorenstudios, Analysestudios, schlüsselfertige Streamproduktion. Technik: ATEM 4 M/E Constellation 4K, Blackmagic URSA Broadcast G2, Micro Studio Camera 4K G2. Spitzenpublikum: 700.000 Zuschauer.",
      "Esports World Cup 2025, Riyadh, de juillet à août. Flux dans des langues supplémentaires : arabe, indonésien et filipino. Quatre équipes sur site pendant deux mois. Périmètre : studios de commentaire, studios d'analyse, production de flux clé en main. Matériel : ATEM 4 M/E Constellation 4K, Blackmagic URSA Broadcast G2, Micro Studio Camera 4K G2. Pic d'audience : 700 000 spectateurs.",
      "Esports World Cup 2025, Riyadh, od lipca do sierpnia. Dodatkowe streamy w językach arabskim, indonezyjskim i filipińskim. Cztery ekipy na miejscu przez dwa miesiące. Zakres: studia komentatorskie, studia analityczne, produkcja streamów pod klucz. Sprzęt: ATEM 4 M/E Constellation 4K, Blackmagic URSA Broadcast G2, Micro Studio Camera 4K G2. Szczytowa widownia: 700 000 widzów.",
      "„Esports World Cup 2025“, Riyadh, nuo liepos iki rugpjūčio. Papildomos kalbos: arabų, indoneziečių ir filipiniečių. Keturios komandos vietoje du mėnesius. Apimtis: komentatorių studijos, analizės studijos, pilno ciklo transliacijų gamyba. Įranga: ATEM 4 M/E Constellation 4K, Blackmagic URSA Broadcast G2, Micro Studio Camera 4K G2. Didžiausia auditorija: 700 000 žiūrovų.",
    ),
    seoTitle: x(
      "EWC 2025 Additional Language Streams | Poerator",
      "EWC 2025 Streams in weiteren Sprachen | Poerator",
      "EWC 2025 Flux en langues supplémentaires | Poerator",
      "EWC 2025 Streamy w innych językach | Poerator",
      "EWC 2025 papildomų kalbų transliacijos | Poerator",
    ),
    seoDescription: x(
      "EWC 2025 Riyadh: additional language streams in Arabic, Indonesian, Filipino. 4 crews, 2 months. Peak 700,000 viewers. Poerator.",
      "EWC 2025 Riyadh: zusätzliche Sprachstreams in Arabisch, Indonesisch, Filipino. 4 Teams, 2 Monate. Spitze 700.000 Zuschauer. Poerator.",
      "EWC 2025 Riyadh : flux en arabe, indonésien, filipino. 4 équipes, 2 mois. Pic de 700 000 spectateurs. Poerator.",
      "EWC 2025 Riyadh: dodatkowe streamy po arabsku, indonezyjsku i filipińsku. 4 ekipy, 2 miesiące. Szczyt 700 000 widzów. Poerator.",
      "EWC 2025 Riyadh: papildomos kalbos – arabų, indoneziečių, filipiniečių. 4 komandos, 2 mėnesiai. Daugiausia 700 000 žiūrovų. Poerator.",
    ),
  },

  "ewc-2026-paris": {
    header: {
      project: "Esports World Cup 2026 Paris",
      format: x("Esports tournament broadcast engineering support", "Broadcast-Engineering-Support für ein E-Sport-Turnier", "Support d'ingénierie broadcast pour un tournoi d'esport", "Wsparcie inżynierii broadcastowej turnieju esportowego", "E. sporto turnyro transliacijos inžinerinė pagalba"),
      venue: "Paris",
      date: x("June-August 2026", "Juni–August 2026", "Juin-août 2026", "Czerwiec–sierpień 2026", "2026 m. birželis–rugpjūtis"),
    },
    challenge: x(
      "Communication with the other departments with no room for human error at a large event",
      "Kommunikation mit den anderen Abteilungen ohne Spielraum für menschliche Fehler bei einer Großveranstaltung",
      "Communication avec les autres départements sans droit à l'erreur humaine lors d'un grand événement",
      "Komunikacja z pozostałymi działami bez miejsca na błąd ludzki na dużym wydarzeniu",
      "Bendravimas su kitais skyriais be vietos žmogiškajai klaidai dideliame renginyje",
    ),
    kit: [
      ["Riedel ", x("intercom", "Intercom", "interphone", "intercom", "ryšio sistema")],
      ["vMix ", x("servers", "Server", "serveurs", "serwery", "serveriai")],
      [x("Fibre signal switching", "Glasfaser-Signalumschaltung", "Commutation de signal sur fibre", "Przełączanie sygnału światłowodowego", "Šviesolaidinis signalų komutavimas")],
    ],
    constraints: [
      x("4 tournament stages", "4 Turnierbühnen", "4 scènes de tournoi", "4 sceny turniejowe", "4 turnyro scenos"),
      x("2 months on site", "2 Monate vor Ort", "2 mois sur site", "2 miesiące na miejscu", "2 mėnesiai vietoje"),
      x("Snapchat AR filter technology newly implemented", "Neu eingeführte Snapchat-AR-Filtertechnologie", "Technologie de filtres AR Snapchat nouvellement mise en œuvre", "Nowo wdrożona technologia filtrów AR Snapchat", "Naujai įdiegta „Snapchat“ AR filtrų technologija"),
    ],
    result: [
      { label: "scope", value: x("player team-speak replays for all disciplines, broadcast to screens on all 4 stages, broadcast control", "Team-Speak-Wiedergaben der Spieler für alle Disziplinen, Übertragung auf Bildschirme auf allen 4 Bühnen, Sendungskontrolle", "relectures du team-speak des joueurs pour toutes les disciplines, diffusion sur les écrans des 4 scènes, contrôle de la diffusion", "powtórki komunikacji graczy dla wszystkich dyscyplin, transmisja na ekrany na wszystkich 4 scenach, kontrola emisji", "žaidėjų komandinio ryšio įrašų peržiūros visoms disciplinoms, transliacija ekranuose visose 4 scenose, transliacijos valdymas") },
      { label: "ar", value: x("Snapchat AR filter setup and live operation", "Einrichtung und Live-Betrieb der Snapchat-AR-Filter", "Configuration et exploitation en direct des filtres AR Snapchat", "Konfiguracja i obsługa na żywo filtrów AR Snapchat", "„Snapchat“ AR filtrų paruošimas ir valdymas tiesiogiai") },
      { label: "client", value: "EFG Group" },
    ],
    narrative: x(
      "Esports World Cup 2026, Paris, June to August. Broadcast engineering support for the EFG Group team across four tournament stages. Scope: player team-speak replays for all disciplines, broadcast to screens on all four stages, broadcast control, Snapchat AR filter setup and live operation. Kit: Riedel intercom, vMix servers, fibre signal switching.",
      "Esports World Cup 2026, Paris, Juni bis August. Broadcast-Engineering-Support für das Team der EFG Group auf vier Turnierbühnen. Umfang: Team-Speak-Wiedergaben der Spieler für alle Disziplinen, Übertragung auf Bildschirme auf allen vier Bühnen, Sendungskontrolle, Einrichtung und Live-Betrieb der Snapchat-AR-Filter. Technik: Riedel Intercom, vMix-Server, Glasfaser-Signalumschaltung.",
      "Esports World Cup 2026, Paris, de juin à août. Support d'ingénierie broadcast pour l'équipe d'EFG Group sur quatre scènes de tournoi. Périmètre : relectures du team-speak des joueurs pour toutes les disciplines, diffusion sur les écrans des quatre scènes, contrôle de la diffusion, configuration et exploitation en direct des filtres AR Snapchat. Matériel : interphone Riedel, serveurs vMix, commutation de signal sur fibre.",
      "Esports World Cup 2026, Paryż, od czerwca do sierpnia. Wsparcie inżynierii broadcastowej dla zespołu EFG Group na czterech scenach turniejowych. Zakres: powtórki komunikacji graczy dla wszystkich dyscyplin, transmisja na ekrany na wszystkich czterech scenach, kontrola emisji, konfiguracja i obsługa na żywo filtrów AR Snapchat. Sprzęt: intercom Riedel, serwery vMix, przełączanie sygnału światłowodowego.",
      "„Esports World Cup 2026“, Paryžius, nuo birželio iki rugpjūčio. Transliacijos inžinerinė pagalba „EFG Group“ komandai keturiose turnyro scenose. Apimtis: žaidėjų komandinio ryšio įrašų peržiūros visoms disciplinoms, transliacija ekranuose visose keturiose scenose, transliacijos valdymas, „Snapchat“ AR filtrų paruošimas ir valdymas tiesiogiai. Įranga: Riedel ryšio sistema, vMix serveriai, šviesolaidinis signalų komutavimas.",
    ),
    seoTitle: x(
      "EWC 2026 Paris | Broadcast Engineering | Poerator",
      "EWC 2026 Paris | Broadcast Engineering | Poerator",
      "EWC 2026 Paris | Ingénierie broadcast | Poerator",
      "EWC 2026 Paryż | Inżynieria broadcast | Poerator",
      "EWC 2026 Paryžius | Transliacijos inžinerija | Poerator",
    ),
    seoDescription: x(
      "EWC 2026 Paris: broadcast engineering support for EFG Group. 4 stages, 2 months, Snapchat AR filters, Riedel intercom. Poerator.",
      "EWC 2026 Paris: Broadcast-Engineering-Support für EFG Group. 4 Bühnen, 2 Monate, Snapchat-AR-Filter, Riedel Intercom. Poerator.",
      "EWC 2026 Paris : support d'ingénierie broadcast pour EFG Group. 4 scènes, 2 mois, filtres AR Snapchat, Riedel. Poerator.",
      "EWC 2026 Paryż: wsparcie inżynierii broadcast dla EFG Group. 4 sceny, 2 miesiące, filtry AR Snapchat, Riedel. Poerator.",
      "EWC 2026 Paryžius: transliacijos inžinerija EFG Group. 4 scenos, 2 mėnesiai, Snapchat AR filtrai, Riedel. Poerator.",
    ),
  },

  "fiba-3x3-split-challenger-tournament-broadcasting": {
    header: {
      project: "FIBA 3x3 Split Challenger Tournament Broadcasting",
      format: x("Sports tournament broadcast (3x3 basketball)", "Sportturnier-Übertragung (3x3-Basketball)", "Diffusion d'un tournoi sportif (basket 3x3)", "Transmisja turnieju sportowego (koszykówka 3x3)", "Sporto turnyro transliacija (3x3 krepšinis)"),
      venue: "Split",
      crew: "14",
      date: x("August 2024", "August 2024", "Août 2024", "Sierpień 2024", "2024 m. rugpjūtis"),
    },
    challenge: x("Open-air venue with changing light", "Freiluft-Spielort mit wechselndem Licht", "Site en plein air avec lumière changeante", "Obiekt na otwartym powietrzu ze zmiennym światłem", "Atvira aikštelė su kintančia šviesa"),
    kit: [
      [x("Sony Z150 camera", "Sony Z150 Kamera", "Caméra Sony Z150", "Kamera Sony Z150", "Sony Z150 kamera")],
      ["vMix ", x("servers", "Server", "serveurs", "serwery", "serveriai")],
      ["Starlink"],
    ],
    constraints: [
      x("Open-air venue, changing light", "Freiluft-Spielort, wechselndes Licht", "Site en plein air, lumière changeante", "Obiekt na otwartym powietrzu, zmienne światło", "Atvira aikštelė, kintanti šviesa"),
    ],
    result: [
      { label: "delivery", value: x("official FIBA3x3 YouTube channel", "offizieller FIBA3x3-YouTube-Kanal", "chaîne YouTube officielle FIBA3x3", "oficjalny kanał FIBA3x3 na YouTube", "oficialus FIBA3x3 „YouTube“ kanalas") },
    ],
    narrative: x(
      "FIBA 3x3 Challenger tournament broadcast, Split, August 2024. 3x3 basketball. Crew of 14. Sony Z150 cameras, vMix servers for switching and graphics, Starlink uplink. Open-air venue with changing light. Stream published on the official FIBA3x3 YouTube channel. Producer: Poerator.",
      "Übertragung des FIBA 3x3 Challenger-Turniers, Split, August 2024. 3x3-Basketball. Team aus 14 Personen. Sony Z150 Kameras, vMix-Server für Bildmischung und Grafiken, Starlink-Uplink. Freiluft-Spielort mit wechselndem Licht. Stream auf dem offiziellen FIBA3x3-YouTube-Kanal veröffentlicht. Produzent: Poerator.",
      "Diffusion du tournoi FIBA 3x3 Challenger, Split, août 2024. Basket 3x3. Équipe de 14 personnes. Caméras Sony Z150, serveurs vMix pour le mélange et les graphismes, liaison montante Starlink. Site en plein air avec lumière changeante. Flux publié sur la chaîne YouTube officielle FIBA3x3. Producteur : Poerator.",
      "Transmisja turnieju FIBA 3x3 Challenger, Split, sierpień 2024. Koszykówka 3x3. Ekipa 14 osób. Kamery Sony Z150, serwery vMix do miksowania i grafiki, łącze Starlink. Obiekt na otwartym powietrzu ze zmiennym światłem. Stream opublikowany na oficjalnym kanale FIBA3x3 na YouTube. Producent: Poerator.",
      "„FIBA 3x3 Challenger“ turnyro transliacija, Splitas, 2024 m. rugpjūtis. 3x3 krepšinis. 14 žmonių komanda. Sony Z150 kameros, vMix serveriai maišymui ir grafikai, Starlink ryšys. Atvira aikštelė su kintančia šviesa. Transliacija paskelbta oficialiame FIBA3x3 „YouTube“ kanale. Gamintojas: Poerator.",
    ),
    seoTitle: x(
      "FIBA 3x3 Split Challenger | Broadcast | Poerator",
      "FIBA 3x3 Split Challenger | Übertragung | Poerator",
      "FIBA 3x3 Split Challenger | Diffusion | Poerator",
      "FIBA 3x3 Split Challenger | Transmisja | Poerator",
      "FIBA 3x3 Split Challenger | Transliacija | Poerator",
    ),
    seoDescription: x(
      "FIBA 3x3 Split Challenger: tournament broadcast, August 2024. Crew of 14, Sony Z150 cameras, vMix, Starlink. Production by Poerator.",
      "FIBA 3x3 Split Challenger: Turnierübertragung, August 2024. 14 Personen, Sony Z150 Kameras, vMix, Starlink. Produktion von Poerator.",
      "FIBA 3x3 Split Challenger : diffusion du tournoi, août 2024. Équipe de 14, caméras Sony Z150, vMix, Starlink. Production Poerator.",
      "FIBA 3x3 Split Challenger: transmisja turnieju, sierpień 2024. Ekipa 14 osób, kamery Sony Z150, vMix, Starlink. Produkcja Poerator.",
      "FIBA 3x3 Split Challenger: turnyro transliacija, 2024 m. rugpjūtis. 14 žmonių, Sony Z150 kameros, vMix, Starlink. Gamina Poerator.",
    ),
  },

  "gurtam-commercial-production-service": {
    header: {
      project: "GURTAM Commercial",
      format: x("Commercial, production service", "Werbefilm, Produktionsservice", "Film publicitaire, service de production", "Reklama, usługa produkcyjna", "Reklama, gamybos paslauga"),
      venue: x("GURTAM office", "GURTAM-Büro", "Bureau de GURTAM", "Biuro GURTAM", "GURTAM biuras"),
      crew: "17",
    },
    challenge: x("Production service for all departments except direction", "Produktionsservice für alle Abteilungen außer der Regie", "Service de production pour tous les départements sauf la réalisation", "Usługa produkcyjna dla wszystkich działów oprócz reżyserii", "Gamybos paslauga visiems skyriams, išskyrus režisūrą"),
    kit: [
      [x("Sony FX6 camera", "Sony FX6 Kamera", "Caméra Sony FX6", "Kamera Sony FX6", "Sony FX6 kamera")],
      [x("Anamorphic lenses", "Anamorphe Objektive", "Objectifs anamorphiques", "Obiektywy anamorficzne", "Anamorfiniai objektyvai")],
      [x("Boom microphone", "Angelmikrofon", "Micro perche", "Mikrofon na tyczce", "Mikrofonas ant kranelio")],
    ],
    constraints: [x("6 videos in 2 shooting days", "6 Videos in 2 Drehtagen", "6 vidéos en 2 jours de tournage", "6 filmów w 2 dni zdjęciowe", "6 vaizdo įrašai per 2 filmavimo dienas")],
    result: [{ label: "output", value: x("6 videos", "6 Videos", "6 vidéos", "6 filmów", "6 vaizdo įrašai") }],
    narrative: x(
      "Commercial production service for GURTAM. Six videos in two shooting days. Crew of 17 covering all departments except direction. Location: GURTAM office. Camera: Sony FX6 with anamorphic lenses. Sound recorded on set with a boom microphone. Client: GURTAM. Format: commercial.",
      "Produktionsservice für einen GURTAM-Werbefilm. Sechs Videos in zwei Drehtagen. Team aus 17 Personen für alle Abteilungen außer der Regie. Drehort: GURTAM-Büro. Kamera: Sony FX6 mit anamorphen Objektiven. Ton am Set mit Angelmikrofon aufgenommen. Kunde: GURTAM. Format: Werbefilm.",
      "Service de production pour un film publicitaire GURTAM. Six vidéos en deux jours de tournage. Équipe de 17 personnes couvrant tous les départements sauf la réalisation. Lieu : bureau de GURTAM. Caméra : Sony FX6 avec objectifs anamorphiques. Son enregistré sur le plateau avec un micro perche. Client : GURTAM. Format : film publicitaire.",
      "Usługa produkcyjna dla reklamy GURTAM. Sześć filmów w dwa dni zdjęciowe. Ekipa 17 osób obejmująca wszystkie działy oprócz reżyserii. Lokalizacja: biuro GURTAM. Kamera: Sony FX6 z obiektywami anamorficznymi. Dźwięk nagrywany na planie mikrofonem na tyczce. Klient: GURTAM. Format: reklama.",
      "Reklamos „GURTAM“ gamybos paslauga. Šeši vaizdo įrašai per dvi filmavimo dienas. 17 žmonių komanda, apimanti visus skyrius, išskyrus režisūrą. Vieta: GURTAM biuras. Kamera: Sony FX6 su anamorfiniais objektyvais. Garsas įrašytas aikštelėje mikrofonu ant kranelio. Klientas: GURTAM. Formatas: reklama.",
    ),
    seoTitle: x(
      "GURTAM Commercial | Video Production | Poerator",
      "GURTAM Werbefilm | Videoproduktion | Poerator",
      "GURTAM Publicité | Production vidéo | Poerator",
      "GURTAM Reklama | Produkcja wideo | Poerator",
      "GURTAM reklama | Video gamyba | Poerator",
    ),
    seoDescription: x(
      "GURTAM commercial: production service. 6 videos in 2 shooting days, crew of 17, Sony FX6 with anamorphic lenses. Poerator.",
      "GURTAM Werbefilm: Produktionsservice. 6 Videos in 2 Drehtagen, 17 Personen, Sony FX6 mit anamorphen Objektiven. Poerator.",
      "Film publicitaire GURTAM : service de production. 6 vidéos en 2 jours, équipe de 17, Sony FX6 anamorphique. Poerator.",
      "Reklama GURTAM: usługa produkcyjna. 6 filmów w 2 dni zdjęciowe, ekipa 17 osób, Sony FX6 z anamorfami. Poerator.",
      "GURTAM reklama: gamybos paslauga. 6 vaizdo įrašai per 2 dienas, 17 žmonių, Sony FX6 su anamorfais. Poerator.",
    ),
  },

  "iem-cologne": {
    header: {
      project: "IEM Cologne",
      format: x("Community casts", "Community-Casts", "Community casts", "Community casty", "Community castai"),
      venue: "LANXESS arena, Cologne",
      dates: x("August 2025, June 2026", "August 2025, Juni 2026", "août 2025, juin 2026", "sierpień 2025, czerwiec 2026", "2025 m. rugpjūtis, 2026 m. birželis"),
      client: "ESL",
      crew: "2025: 6, 2026: 21",
      date: "2025, 2026",
      team: ["roman-chernyavskiy", "yana-sabaleuskaya", "andrej-vinogradov"],
      scope: [
        x("Cameras", "Kameras", "Caméras", "Kamery", "Kameros"),
        x("Switching", "Bildmischung", "Mixage", "Przełączanie", "Perjungimas"),
        x("Graphics", "Grafik", "Graphismes", "Grafika", "Grafika"),
        x("Live crosses from areas under the stands", "Live-Schalten aus den Bereichen unter den Tribünen", "Duplex en direct depuis les zones sous les tribunes", "Wejścia na żywo z obszarów pod trybunami", "Tiesioginiai įjungimai iš erdvių po tribūnomis"),
        x("Directing", "Regie", "Réalisation", "Reżyseria", "Režisūra"),
        x("Engineering", "Technik", "Ingénierie", "Inżynieria", "Inžinerija"),
      ],
      deliverables: [
        x("3 community casts", "3 Community-Casts", "3 community casts", "3 community casty", "3 community castai"),
        x("6-13 hours per cast per day", "6–13 Stunden pro Cast und Tag", "6 à 13 heures par cast et par jour", "6–13 godzin na cast dziennie", "6–13 valandų per transliaciją per dieną"),
        x("4 days", "4 Tage", "4 jours", "4 dni", "4 dienos"),
      ],
      deliverablesNote: x("Same deliverables in 2025 and 2026", "Gleiche Leistungen 2025 und 2026", "Mêmes livrables en 2025 et 2026", "Taki sam zakres w 2025 i 2026", "Tie patys pristatomi darbai 2025 ir 2026 m."),
    },
    kit: [
      [ursaG2],
      [{ equipment: { category: "cameras", slug: "blackmagic-ursa-mini-pro-12k" } }],
      [{ equipment: { category: "cameras", slug: "blackmagic-micro-studio-camera-4k-g2" } }],
      [atem],
      [solidcom],
      [{ link: "/equipment/lenses", text: x("Fujinon lenses", "Fujinon-Objektive", "Objectifs Fujinon", "Obiektywy Fujinon", "Fujinon objektyvai") }],
    ],
    summaryFromHeader: true,
    plainRelated: true,
    seoTitle: x(
      "IEM Cologne | Esports Casts | Poerator",
      "IEM Cologne | Esports-Casts | Poerator",
      "IEM Cologne | Casts esport | Poerator",
      "IEM Cologne | Casty esportowe | Poerator",
      "IEM Cologne | Esporto transliacijos | Poerator",
    ),
    seoDescription: x(
      "IEM Cologne: community casts, LANXESS arena, Cologne. Dates: August 2025, June 2026. Crew: 6, 21.",
      "IEM Cologne: Community-Casts, LANXESS arena, Cologne. Termine: August 2025, Juni 2026. Crew: 6, 21.",
      "IEM Cologne : community casts, LANXESS arena, Cologne. Dates : août 2025, juin 2026. Équipe : 6, 21.",
      "IEM Cologne: community casty, LANXESS arena, Cologne. Terminy: sierpień 2025, czerwiec 2026. Ekipa: 6, 21.",
      "IEM Cologne: community castai, LANXESS arena, Cologne. Datos: 2025 m. rugpjūtis, 2026 m. birželis. Komanda: 6, 21.",
    ),
  },

  "mozzart-bet-super-liga-ar-graphics": {
    header: {
      project: "Mozzart Bet Super Liga AR Graphics",
      format: x("AR graphics for live sports broadcast", "AR-Grafiken für Live-Sportübertragungen", "Graphismes AR pour diffusion sportive en direct", "Grafika AR do transmisji sportowych na żywo", "AR grafika tiesioginėms sporto transliacijoms"),
      crew: "19",
      date: x("Season 2026-27", "Saison 2026–27", "Saison 2026-27", "Sezon 2026-27", "2026–27 m. sezonas"),
    },
    challenge: x("Match statistics as on-field overlays", "Spielstatistiken als Overlays auf dem Spielfeld", "Statistiques de match en incrustations sur le terrain", "Statystyki meczowe jako nakładki na boisku", "Rungtynių statistika kaip aikštės uždangos"),
    kit: [
      [x("In-house AR software", "Eigene AR-Software", "Logiciel AR interne", "Własne oprogramowanie AR", "Nuosava AR programinė įranga")],
      [x("Database integration", "Datenbankanbindung", "Intégration de base de données", "Integracja z bazą danych", "Integracija su duomenų baze")],
      [x("AI tracking", "KI-Tracking", "Suivi par IA", "Śledzenie z użyciem AI", "DI sekimas")],
    ],
    constraints: [
      x("Camera feeds supplied by the broadcasters", "Kamerasignale werden von den Sendern geliefert", "Flux caméra fournis par les diffuseurs", "Sygnały z kamer dostarczane przez nadawców", "Kamerų signalus pateikia transliuotojai"),
      x("7 matches per week", "7 Spiele pro Woche", "7 matchs par semaine", "7 meczów w tygodniu", "7 rungtynės per savaitę"),
    ],
    result: [
      { label: "output", value: x("on-field overlays for football and basketball", "Overlays auf dem Spielfeld für Fußball und Basketball", "incrustations sur le terrain pour le football et le basket-ball", "nakładki na boisku dla piłki nożnej i koszykówki", "aikštės uždangos futbolui ir krepšiniui") },
      { label: "partner", value: "Arena Media Channel" },
    ],
    narrative: x(
      "AR graphics for Mozzart Bet Super Liga, season 2026-27, with Arena Media Channel. Seven matches per week, football and basketball. Crew of 19. In-house AR software. Match statistics from database integration and AI tracking. Camera feeds supplied by the broadcasters. Output: on-field overlays.",
      "AR-Grafiken für die Mozzart Bet Super Liga, Saison 2026–27, mit Arena Media Channel. Sieben Spiele pro Woche, Fußball und Basketball. Team aus 19 Personen. Eigene AR-Software. Spielstatistiken aus Datenbankanbindung und KI-Tracking. Kamerasignale werden von den Sendern geliefert. Ergebnis: Overlays auf dem Spielfeld.",
      "Graphismes AR pour la Mozzart Bet Super Liga, saison 2026-27, avec Arena Media Channel. Sept matchs par semaine, football et basket-ball. Équipe de 19 personnes. Logiciel AR interne. Statistiques de match issues de l'intégration de base de données et du suivi par IA. Flux caméra fournis par les diffuseurs. Livrable : incrustations sur le terrain.",
      "Grafika AR dla Mozzart Bet Super Liga, sezon 2026-27, we współpracy z Arena Media Channel. Siedem meczów w tygodniu, piłka nożna i koszykówka. Ekipa 19 osób. Własne oprogramowanie AR. Statystyki meczowe z integracji z bazą danych i śledzenia AI. Sygnały z kamer dostarczają nadawcy. Efekt: nakładki na boisku.",
      "AR grafika „Mozzart Bet Super Liga“, 2026–27 m. sezonas, kartu su „Arena Media Channel“. Septynerios rungtynės per savaitę, futbolas ir krepšinis. 19 žmonių komanda. Nuosava AR programinė įranga. Rungtynių statistika iš integracijos su duomenų baze ir DI sekimo. Kamerų signalus pateikia transliuotojai. Rezultatas: aikštės uždangos.",
    ),
    seoTitle: x(
      "Mozzart Bet Super Liga AR Graphics | Poerator",
      "Mozzart Bet Super Liga AR-Grafiken | Poerator",
      "Mozzart Bet Super Liga Graphismes AR | Poerator",
      "Mozzart Bet Super Liga Grafika AR | Poerator",
      "Mozzart Bet Super Liga AR grafika | Poerator",
    ),
    seoDescription: x(
      "Mozzart Bet Super Liga AR graphics, season 2026-27: 7 matches per week, football and basketball, on-field overlays. Poerator.",
      "Mozzart Bet Super Liga AR-Grafiken, Saison 2026–27: 7 Spiele pro Woche, Fußball und Basketball, Overlays auf dem Spielfeld. Poerator.",
      "Mozzart Bet Super Liga, graphismes AR, saison 2026-27 : 7 matchs par semaine, football et basket, incrustations sur le terrain. Poerator.",
      "Mozzart Bet Super Liga, grafika AR, sezon 2026-27: 7 meczów w tygodniu, piłka i koszykówka, nakładki na boisku. Poerator.",
      "Mozzart Bet Super Liga AR grafika, 2026–27 m.: 7 rungtynės per savaitę, futbolas ir krepšinis, aikštės uždangos. Poerator.",
    ),
  },

  "nested-lands-game-teaser-trailer": {
    header: {
      project: "Nested Lands Official Game Teaser Trailer",
      format: x("Video game teaser trailer, turnkey production", "Teaser-Trailer für ein Videospiel, Komplettproduktion", "Bande-annonce teaser d'un jeu vidéo, production clé en main", "Zwiastun teaserowy gry wideo, produkcja pod klucz", "Vaizdo žaidimo anonsinis klipas, pilnas gamybos ciklas"),
      venue: x("Ethnic village, Kernave, Lithuania", "Ethnodorf, Kernave, Litauen", "Village ethnographique, Kernave, Lituanie", "Wioska etnograficzna, Kernave, Litwa", "Etninis kaimas, Kernave, Lietuva"),
      crew: "34",
      date: x("November 2023", "November 2023", "Novembre 2023", "Listopad 2023", "2023 m. lapkritis"),
    },
    challenge: x("Full shoot in one day", "Gesamter Dreh an einem Tag", "Tournage complet en une journée", "Cały plan zdjęciowy w jeden dzień", "Visas filmavimas per vieną dieną"),
    kit: [
      [x("Sony FX6 camera", "Sony FX6 Kamera", "Caméra Sony FX6", "Kamera Sony FX6", "Sony FX6 kamera")],
      [x("Moonlight effect lighting", "Mondlicht-Effektbeleuchtung", "Éclairage à effet clair de lune", "Oświetlenie imitujące światło księżyca", "Mėnesienos efekto apšvietimas")],
      [x("20+ real-fire torches", "20+ Fackeln mit echtem Feuer", "20+ torches à flamme réelle", "20+ prawdziwych pochodni", "20+ tikro ugnies deglų")],
    ],
    constraints: [
      x("One shooting day", "Ein Drehtag", "Une journée de tournage", "Jeden dzień zdjęciowy", "Viena filmavimo diena"),
      x("Historical accuracy", "Historische Genauigkeit", "Exactitude historique", "Dokładność historyczna", "Istorinis tikslumas"),
      x("Props", "Requisiten", "Accessoires", "Rekwizyty", "Rekvizitas"),
      x("Staged fencing scenes", "Inszenierte Fechtszenen", "Scènes d'escrime chorégraphiées", "Inscenizowane sceny szermierki", "Surežisuotos fechtavimosi scenos"),
      x("Full darkness lit by torches only", "Völlige Dunkelheit, nur von Fackeln beleuchtet", "Obscurité totale éclairée uniquement par des torches", "Całkowita ciemność oświetlona wyłącznie pochodniami", "Visiška tamsa, apšviesta tik deglais"),
    ],
    result: [{ label: "output", value: x("1 video game teaser trailer", "1 Teaser-Trailer für ein Videospiel", "1 bande-annonce teaser de jeu vidéo", "1 zwiastun teaserowy gry wideo", "1 vaizdo žaidimo anonsinis klipas") }],
    narrative: x(
      "Teaser trailer for the video game Nested Lands. Shot in one day in November 2023 at an ethnic village in Kernave, Lithuania. Crew of 34. Camera: Sony FX6. Lighting: moonlight effect in full darkness, more than 20 real-fire torches. Challenges: one-day schedule, historical accuracy, props, staged fencing scenes.",
      "Teaser-Trailer für das Videospiel Nested Lands. An einem Tag im November 2023 in einem Ethnodorf in Kernave, Litauen, gedreht. Team aus 34 Personen. Kamera: Sony FX6. Beleuchtung: Mondlicht-Effekt in völliger Dunkelheit, mehr als 20 Fackeln mit echtem Feuer. Herausforderungen: Ein-Tages-Zeitplan, historische Genauigkeit, Requisiten, inszenierte Fechtszenen.",
      "Bande-annonce teaser du jeu vidéo Nested Lands. Tournée en une journée en novembre 2023 dans un village ethnographique de Kernave, Lituanie. Équipe de 34 personnes. Caméra : Sony FX6. Éclairage : effet clair de lune dans l'obscurité totale, plus de 20 torches à flamme réelle. Enjeux : planning d'une journée, exactitude historique, accessoires, scènes d'escrime chorégraphiées.",
      "Zwiastun teaserowy gry wideo Nested Lands. Nakręcony w jeden dzień w listopadzie 2023 w wiosce etnograficznej w Kernave na Litwie. Ekipa 34 osób. Kamera: Sony FX6. Oświetlenie: efekt światła księżyca w całkowitej ciemności, ponad 20 prawdziwych pochodni. Wyzwania: harmonogram jednego dnia, dokładność historyczna, rekwizyty, inscenizowane sceny szermierki.",
      "Vaizdo žaidimo „Nested Lands“ anonsinis klipas. Nufilmuotas per vieną dieną 2023 m. lapkritį etniniame kaime Kernave, Lietuvoje. 34 žmonių komanda. Kamera: Sony FX6. Apšvietimas: mėnesienos efektas visiškoje tamsoje, daugiau nei 20 tikro ugnies deglų. Iššūkiai: vienos dienos grafikas, istorinis tikslumas, rekvizitas, surežisuotos fechtavimosi scenos.",
    ),
    seoTitle: x(
      "Nested Lands Game Teaser | Video Production | Poerator",
      "Nested Lands Game-Teaser | Videoproduktion | Poerator",
      "Nested Lands Teaser de jeu | Production vidéo | Poerator",
      "Nested Lands Teaser gry | Produkcja wideo | Poerator",
      "Nested Lands žaidimo anonsas | Video gamyba | Poerator",
    ),
    seoDescription: x(
      "Nested Lands video game teaser trailer: shot in 1 day, Kernave, Lithuania. Crew of 34, 20+ real-fire torches. Production by Poerator.",
      "Nested Lands Videospiel-Teaser: an 1 Tag in Kernave, Litauen gedreht. 34 Personen, 20+ Fackeln mit echtem Feuer. Produktion von Poerator.",
      "Bande-annonce teaser du jeu Nested Lands : tournée en 1 jour à Kernave, Lituanie. Équipe de 34, 20+ torches réelles. Production Poerator.",
      "Zwiastun teaserowy gry Nested Lands: nakręcony w 1 dzień w Kernave, Litwa. Ekipa 34 osób, 20+ prawdziwych pochodni. Produkcja Poerator.",
      "Žaidimo Nested Lands anonsas: nufilmuotas per 1 dieną Kernave, Lietuvoje. 34 žmonės, 20+ tikro ugnies deglų. Gamina Poerator.",
    ),
  },

  "poerator-crew-at-starladder-starseries-19": {
    header: {
      project: "Starladder StarSeries 19",
      format: x("Esports tournament technical crew", "Technisches Team bei einem E-Sport-Turnier", "Équipe technique d'un tournoi d'esport", "Ekipa techniczna turnieju esportowego", "E. sporto turnyro techninė komanda"),
      venue: "Budapest",
      crew: x("11 Poerator specialists", "11 Poerator-Spezialisten", "11 spécialistes Poerator", "11 specjalistów Poerator", "11 „Poerator“ specialistų"),
      date: x("September 2025", "September 2025", "Septembre 2025", "Wrzesień 2025", "2025 m. rugsėjis"),
    },
    challenge: x("3 technical areas in 1 tournament", "3 technische Bereiche in 1 Turnier", "3 domaines techniques dans 1 tournoi", "3 obszary techniczne w 1 turnieju", "3 techninės sritys viename turnyre"),
    result: [
      { label: "scope", value: x("broadcast engineering, sound engineering, IT support", "Broadcast Engineering, Tontechnik, IT-Support", "ingénierie broadcast, ingénierie du son, support IT", "inżynieria broadcast, inżynieria dźwięku, wsparcie IT", "transliacijos inžinerija, garso inžinerija, IT pagalba") },
      { label: "client", value: "Starladder" },
    ],
    seoTitle: x(
      "Starladder StarSeries 19 | Technical Crew | Poerator",
      "Starladder StarSeries 19 | Technik-Team | Poerator",
      "Starladder StarSeries 19 | Équipe technique | Poerator",
      "Starladder StarSeries 19 | Ekipa techniczna | Poerator",
      "Starladder StarSeries 19 | Techninė komanda | Poerator",
    ),
    seoDescription: x(
      "Starladder StarSeries 19, Budapest: broadcast engineering, sound engineering and IT support. 11 Poerator specialists.",
      "Starladder StarSeries 19, Budapest: Broadcast Engineering, Tontechnik und IT-Support. 11 Poerator-Spezialisten.",
      "Starladder StarSeries 19, Budapest : ingénierie broadcast, ingénierie du son et support IT. 11 spécialistes Poerator.",
      "Starladder StarSeries 19, Budapeszt: inżynieria broadcast, dźwięku i wsparcie IT. 11 specjalistów Poerator.",
      "Starladder StarSeries 19, Budapeštas: transliacijos ir garso inžinerija, IT pagalba. 11 „Poerator“ specialistų.",
    ),
  },

  "video-production-for-xm-textiles": {
    header: {
      project: "Video Production for XM Textiles",
      format: x("Product videos, turnkey production", "Produktvideos, Komplettproduktion", "Vidéos produit, production clé en main", "Filmy produktowe, produkcja pod klucz", "Produktų vaizdo įrašai, pilnas gamybos ciklas"),
      venue: x("Spring studio, Vilnius", "Spring-Studio, Vilnius", "Studio Spring, Vilnius", "Studio Spring, Wilno", "Studija „Spring“, Vilnius"),
      crew: "7",
    },
    challenge: x("10 product videos on workwear fabrics", "10 Produktvideos zu Arbeitskleidungsstoffen", "10 vidéos produit sur les tissus de vêtements de travail", "10 filmów produktowych o tkaninach odzieży roboczej", "10 produktų vaizdo įrašų apie darbo drabužių audinius"),
    result: [
      { label: "output", value: x("10 videos of 5 to 7 minutes", "10 Videos von 5 bis 7 Minuten", "10 vidéos de 5 à 7 minutes", "10 filmów po 5–7 minut", "10 vaizdo įrašų po 5–7 minutes") },
      { label: "use", value: x("training of new sales staff, direct sales, exhibitions and conferences", "Schulung neuer Vertriebsmitarbeiter, Direktvertrieb, Messen und Konferenzen", "formation des nouveaux commerciaux, vente directe, salons et conférences", "szkolenie nowych handlowców, sprzedaż bezpośrednia, targi i konferencje", "naujų pardavimų darbuotojų mokymas, tiesioginiai pardavimai, parodos ir konferencijos") },
      { label: "client", value: "XM Textiles" },
    ],
    narrative: x(
      "Product video series for XM Textiles on workwear fabrics. Ten videos of 5 to 7 minutes. Scope: script, shooting, editing. Studio: Spring studio, Vilnius. Crew of 7. Use: training of new sales staff, direct sales, exhibitions and conferences. Format: product videos. Client: XM Textiles.",
      "Produktvideoserie für XM Textiles zu Arbeitskleidungsstoffen. Zehn Videos von 5 bis 7 Minuten. Umfang: Drehbuch, Dreh, Schnitt. Studio: Spring-Studio, Vilnius. Team aus 7 Personen. Einsatz: Schulung neuer Vertriebsmitarbeiter, Direktvertrieb, Messen und Konferenzen. Format: Produktvideos. Kunde: XM Textiles.",
      "Série de vidéos produit pour XM Textiles sur les tissus de vêtements de travail. Dix vidéos de 5 à 7 minutes. Périmètre : scénario, tournage, montage. Studio : studio Spring, Vilnius. Équipe de 7 personnes. Usage : formation des nouveaux commerciaux, vente directe, salons et conférences. Format : vidéos produit. Client : XM Textiles.",
      "Seria filmów produktowych dla XM Textiles o tkaninach odzieży roboczej. Dziesięć filmów po 5–7 minut. Zakres: scenariusz, zdjęcia, montaż. Studio: Spring, Wilno. Ekipa 7 osób. Zastosowanie: szkolenie nowych handlowców, sprzedaż bezpośrednia, targi i konferencje. Format: filmy produktowe. Klient: XM Textiles.",
      "Produktų vaizdo įrašų serija „XM Textiles“ apie darbo drabužių audinius. Dešimt vaizdo įrašų po 5–7 minutes. Apimtis: scenarijus, filmavimas, montažas. Studija: „Spring“, Vilnius. 7 žmonių komanda. Naudojimas: naujų pardavimų darbuotojų mokymas, tiesioginiai pardavimai, parodos ir konferencijos. Formatas: produktų vaizdo įrašai. Klientas: XM Textiles.",
    ),
    seoTitle: x(
      "XM Textiles | Video Production | Poerator",
      "XM Textiles | Videoproduktion | Poerator",
      "XM Textiles | Production vidéo | Poerator",
      "XM Textiles | Produkcja wideo | Poerator",
      "XM Textiles | Video gamyba | Poerator",
    ),
    seoDescription: x(
      "XM Textiles product videos: 10 videos of 5 to 7 minutes, script to edit. Spring studio, Vilnius. Production by Poerator.",
      "XM Textiles Produktvideos: 10 Videos von 5 bis 7 Minuten, vom Drehbuch bis zum Schnitt. Spring-Studio, Vilnius. Poerator.",
      "Vidéos produit XM Textiles : 10 vidéos de 5 à 7 minutes, du scénario au montage. Studio Spring, Vilnius. Poerator.",
      "Filmy produktowe XM Textiles: 10 filmów po 5–7 minut, od scenariusza po montaż. Studio Spring, Wilno. Poerator.",
      "XM Textiles produktų vaizdo įrašai: 10 po 5–7 min., nuo scenarijaus iki montažo. Studija „Spring“, Vilnius. Poerator.",
    ),
  },
};

export const LEGACY_CASE_SLUGS: Record<string, string> = {
  "nested-lands-game-teaser-trailer": "nested-lands-tv-show-teaser-trailer",
};

export const CARD_ALT: Record<string, string> = {
  "corgi-race-vilnius-2025-stream": "Corgi Race Vilnius 2025 - live stream, Vilnius",
  "corgi-race-vilnius-2026": "Corgi Race Vilnius 2026 - live broadcast, Vilnius",
  "primera-federacion-broadcasting": "Primera Federación - football league broadcast",
  "esports-community-casts": "Esports Community Casts - community casts",
  "ewc-2025-additional-languages-streams": "EWC 2025 - additional language streams, Riyadh",
  "ewc-2026-paris": "EWC 2026 Paris - broadcast engineering, Paris",
  "fiba-3x3-split-challenger-tournament-broadcasting": "FIBA 3x3 Split Challenger - tournament broadcasting, Split",
  "gurtam-commercial-production-service": "Gurtam - commercial production service",
  "iem-cologne": "IEM Cologne - community casts, Cologne",
  "mozzart-bet-super-liga-ar-graphics": "Mozzart Bet Super Liga - AR graphics",
  "nested-lands-game-teaser-trailer": "Nested Lands - game teaser trailer, Kernave",
  "poerator-crew-at-starladder-starseries-19": "Starladder StarSeries 19 - esports tournament technical crew, Budapest",
  "video-production-for-xm-textiles": "XM Textiles - product videos, Vilnius",
};
