import type { Locale } from "@/i18n";

export const SEO_LABELS: Record<Locale, {
  breadcrumb: Record<string, string>;
  relatedServices: string;
  deliveredService: string;
  otherServices: string;
  serviceNames: { live: string; obVan: string; video: string };
  deliveredKinds: { liveBroadcast: string; multiCamera: string; esports: string; esportsEngineering: string; sports: string; graphics: string; technical: string; commercial: string; commercialVideo: string; teaser: string };
  otherAnchors: { obVan: [string, string, string]; video: [string, string, string]; live: [string, string, string] };
}> = {
  en: {
    breadcrumb: { home: "Home", equipment: "Equipment", portfolio: "Portfolio", services: "Services", contact: "Contact", privacy: "Privacy policy", obVan: "OB van", video: "Video production" },
    relatedServices: "Related services", deliveredService: "Delivered service", otherServices: "Other services",
    serviceNames: { live: "Live production", obVan: "OB van", video: "Video production" },
    deliveredKinds: { liveBroadcast: "live broadcast", multiCamera: "multi-camera broadcast", esports: "esports broadcast", esportsEngineering: "esports broadcast engineering", sports: "sports broadcast", graphics: "sports broadcast graphics", technical: "esports technical support", commercial: "commercial", commercialVideo: "commercial video", teaser: "teaser trailer" },
    otherAnchors: {
      obVan: ["OB van: multi-camera live production", "Outside broadcast van: 12 camera channels", "OB van: Starlink-connected unit"],
      video: ["Video production: commercials and brand films", "Video production company: concept to delivery", "Video production: documentaries"],
      live: ["Live production: sport, culture and corporate events", "Live production services", "Live production: end-to-end broadcast"],
    },
  },
  de: {
    breadcrumb: { home: "Startseite", equipment: "Ausrüstung", portfolio: "Referenzen", services: "Leistungen", contact: "Kontakt", privacy: "Datenschutz", obVan: "Übertragungswagen", video: "Videoproduktion" },
    relatedServices: "Verwandte Leistungen", deliveredService: "Erbrachte Leistung", otherServices: "Weitere Leistungen",
    serviceNames: { live: "Live-Produktion", obVan: "Übertragungswagen", video: "Videoproduktion" },
    deliveredKinds: { liveBroadcast: "Live-Übertragung", multiCamera: "Mehrkamera-Übertragung", esports: "Esports-Übertragung", esportsEngineering: "Esports-Übertragungstechnik", sports: "Sportübertragung", graphics: "Sportgrafik", technical: "technische Esports-Unterstützung", commercial: "Werbefilm", commercialVideo: "Werbevideo", teaser: "Teaser-Trailer" },
    otherAnchors: {
      obVan: ["Übertragungswagen: Live-Mehrkamera-Produktion", "Übertragungswagen: 12 Kamerakanäle", "Übertragungswagen: Starlink-Verbindung"],
      video: ["Videoproduktion: Werbe- und Markenfilme", "Videoproduktion: vom Konzept bis zur Lieferung", "Videoproduktion: Dokumentarfilme"],
      live: ["Live-Produktion: Sport, Kultur und Firmenevents", "Live-Produktionsleistungen", "Live-Produktion: komplette Übertragung"],
    },
  },
  fr: {
    breadcrumb: { home: "Accueil", equipment: "Équipement", portfolio: "Réalisations", services: "Services", contact: "Contact", privacy: "Confidentialité", obVan: "Car régie", video: "Production vidéo" },
    relatedServices: "Services associés", deliveredService: "Service réalisé", otherServices: "Autres services",
    serviceNames: { live: "Production en direct", obVan: "Car régie", video: "Production vidéo" },
    deliveredKinds: { liveBroadcast: "retransmission en direct", multiCamera: "retransmission multicaméra", esports: "retransmission esports", esportsEngineering: "ingénierie de diffusion esports", sports: "retransmission sportive", graphics: "graphisme sportif", technical: "assistance technique esports", commercial: "film publicitaire", commercialVideo: "vidéo publicitaire", teaser: "bande-annonce" },
    otherAnchors: {
      obVan: ["Car régie : production multicaméra en direct", "Car régie : 12 voies caméra", "Car régie : connexion Starlink"],
      video: ["Production vidéo : publicités et films de marque", "Production vidéo : du concept à la livraison", "Production vidéo : documentaires"],
      live: ["Production en direct : sport, culture et événements d’entreprise", "Services de production en direct", "Production en direct : retransmission complète"],
    },
  },
  pl: {
    breadcrumb: { home: "Strona główna", equipment: "Sprzęt", portfolio: "Realizacje", services: "Usługi", contact: "Kontakt", privacy: "Prywatność", obVan: "Wóz transmisyjny", video: "Produkcja wideo" },
    relatedServices: "Powiązane usługi", deliveredService: "Zrealizowana usługa", otherServices: "Pozostałe usługi",
    serviceNames: { live: "Produkcja na żywo", obVan: "Wóz transmisyjny", video: "Produkcja wideo" },
    deliveredKinds: { liveBroadcast: "transmisja na żywo", multiCamera: "transmisja wielokamerowa", esports: "transmisja esports", esportsEngineering: "obsługa techniczna transmisji esports", sports: "transmisja sportowa", graphics: "grafika transmisji sportowej", technical: "wsparcie techniczne esports", commercial: "film reklamowy", commercialVideo: "wideo reklamowe", teaser: "zwiastun" },
    otherAnchors: {
      obVan: ["Wóz transmisyjny: produkcja wielokamerowa na żywo", "Wóz transmisyjny: 12 kanałów kamerowych", "Wóz transmisyjny: łączność Starlink"],
      video: ["Produkcja wideo: reklamy i filmy wizerunkowe", "Produkcja wideo: od koncepcji do realizacji", "Produkcja wideo: dokumenty"],
      live: ["Produkcja na żywo: sport, kultura i wydarzenia firmowe", "Usługi produkcji na żywo", "Produkcja na żywo: kompleksowa transmisja"],
    },
  },
  lt: {
    breadcrumb: { home: "Pradžia", equipment: "Įranga", portfolio: "Projektai", services: "Paslaugos", contact: "Kontaktai", privacy: "Privatumas", obVan: "OB furgonas", video: "Vaizdo gamyba" },
    relatedServices: "Susijusios paslaugos", deliveredService: "Suteikta paslauga", otherServices: "Kitos paslaugos",
    serviceNames: { live: "Tiesioginė gamyba", obVan: "OB furgonas", video: "Vaizdo gamyba" },
    deliveredKinds: { liveBroadcast: "tiesioginė transliacija", multiCamera: "kelių kamerų transliacija", esports: "esporto transliacija", esportsEngineering: "esporto transliacijų inžinerija", sports: "sporto transliacija", graphics: "sporto transliacijų grafika", technical: "esporto techninis palaikymas", commercial: "reklama", commercialVideo: "reklaminis vaizdo įrašas", teaser: "anonsas" },
    otherAnchors: {
      obVan: ["OB furgonas: tiesioginė kelių kamerų gamyba", "OB furgonas: 12 kamerų kanalų", "OB furgonas: „Starlink“ ryšys"],
      video: ["Vaizdo gamyba: reklamos ir prekės ženklo filmai", "Vaizdo gamyba: nuo idėjos iki rezultato", "Vaizdo gamyba: dokumentiniai filmai"],
      live: ["Tiesioginė gamyba: sportas, kultūra ir verslo renginiai", "Tiesioginės gamybos paslaugos", "Tiesioginė gamyba: visa transliacija"],
    },
  },
};
