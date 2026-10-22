export type DeliveredService = "live" | "video";

export const CASE_SERVICES: Record<string, { delivered: DeliveredService; kind: string }> = {
  "corgi-race-vilnius-2025-stream": { delivered: "live", kind: "liveBroadcast" },
  "corgi-race-vilnius-2026": { delivered: "live", kind: "multiCamera" },
  "esports-community-casts": { delivered: "live", kind: "esports" },
  "ewc-2025-additional-languages-streams": { delivered: "live", kind: "esports" },
  "ewc-2026-paris": { delivered: "live", kind: "esportsEngineering" },
  "fiba-3x3-split-challenger-tournament-broadcasting": { delivered: "live", kind: "sports" },
  "iem-masters-cologne": { delivered: "live", kind: "esports" },
  "mozzart-bet-super-liga-ar-graphics": { delivered: "live", kind: "graphics" },
  "primera-federacion-broadcasting": { delivered: "live", kind: "sports" },
  "poerator-crew-at-starladder-starseries-19": { delivered: "live", kind: "technical" },
  "gurtam-commercial-production-service": { delivered: "video", kind: "commercial" },
  "video-production-for-xm-textiles": { delivered: "video", kind: "commercialVideo" },
  "nested-lands-game-teaser-trailer": { delivered: "video", kind: "teaser" },
};
