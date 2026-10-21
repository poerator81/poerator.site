import type { Equipment } from "@/lib/content";
import { isCapabilityGroup } from "@/lib/capability-groups";

type Relation = { slug: string };

const RELATIONS: Record<string, Relation[]> = {
  "blackmagic-ursa-studio-viewfinder-g2": [{ slug: "blackmagic-ursa-broadcast-g2" }],
  "fujinon-digi-power-a22x7-8berd-s48b-78-172mm-f1-8-2-3-b4-mount": [
    { slug: "fujinon-xa20sx8-5berm-k3-eng-lens" },
    { slug: "fujinon-srd-92b-zoom-demand" },
    { slug: "blackmagic-ursa-broadcast-g2" },
  ],
  "fujinon-srd-92b-zoom-demand": [
    { slug: "blackmagic-ursa-broadcast-g2" },
    { slug: "fujinon-digi-power-a22x7-8berd-s48b-78-172mm-f1-8-2-3-b4-mount" },
  ],
  "ulanzi-mt90-cka-mini-tripod-for-dji-pocket-4": [{ slug: "dji-osmo-pocket-4" }],
  "blackmagic-ursa-mini-pro-12k": [{ slug: "dji-osmo-pocket-4" }],
  "canon-ef-16-35-mm-f-2-8l-iii-usm": [{ slug: "dji-osmo-pocket-4" }],
  "sigma-24-70mm-f2-8-dg-os-hsm-lens": [{ slug: "dji-osmo-pocket-4" }],
  "hollyland-solidcom-c1-pro-8s": [
    { slug: "accsoon-cineview-master-4k" },
    { slug: "hollyland-solidcom-c1-pro-hub" },
    { slug: "blackmagic-ursa-broadcast-g2" },
  ],
  "hollyland-solidcom-c1-pro-hub": [
    { slug: "accsoon-cineview-master-4k" },
    { slug: "hollyland-solidcom-c1-pro-8s" },
    { slug: "blackmagic-ursa-broadcast-g2" },
  ],
  "blackmagic-ursa-broadcast-g2": [
    { slug: "blackmagic-ursa-studio-viewfinder-g2" },
    { slug: "fujinon-digi-power-a22x7-8berd-s48b-78-172mm-f1-8-2-3-b4-mount" },
    { slug: "fujinon-srd-92b-zoom-demand" },
    { slug: "accsoon-cineview-master-4k" },
  ],
  "accsoon-cineview-master-4k": [
    { slug: "hollyland-solidcom-c1-pro-8s" },
    { slug: "hollyland-solidcom-c1-pro-hub" },
    { slug: "blackmagic-ursa-broadcast-g2" },
    { slug: "feelworld-monitor-f5-pro-v4-6" },
  ],
  "feelworld-monitor-f5-pro-v4-6": [{ slug: "accsoon-cineview-master-4k" }],
  "nanlite-pavotube-ii-30c-rgb-led-tube-light-4-4kit": [{ slug: "amaran-ray-360c" }],
  "neewer-35-4-90cm-softbox": [{ slug: "amaran-ray-360c" }],
  "shape-c-stand-40-sliding-leg-10-6": [{ slug: "amaran-ray-360c" }],
  "smallrig-78-7-200cm-light-stand": [{ slug: "amaran-ray-360c" }],
  "fujinon-xa20sx8-5berm-k3-eng-lens": [{ slug: "fujinon-digi-power-a22x7-8berd-s48b-78-172mm-f1-8-2-3-b4-mount" }],
  "decklink-duo-2": [{ slug: "decklink-quad-2" }],
  "decklink-duo-3": [{ slug: "decklink-quad-2" }],
  "decklink-duo-4": [{ slug: "decklink-quad-2" }],
  "decklink-4k-extreme-12g": [{ slug: "decklink-quad-2" }],
  "blackmagic-streaming-encoder-4k": [{ slug: "decklink-quad-2" }],
};

export function relatedEquipment(item: Equipment, allItems: Equipment[]): Equipment[] {
  const relations = RELATIONS[item.slug] ?? [];
  const selected: Equipment[] = relations.flatMap((relation) => {
    const target = allItems.find((candidate) => candidate.slug === relation.slug);
    if (!target?.category?.slug) throw new Error(`Related equipment "${relation.slug}" was not found or has no category`);
    return [target];
  });
  if (!isCapabilityGroup(item.capabilityGroup)) return selected.slice(0, 6);
  const sameGroup = allItems.filter((candidate) =>
    candidate.slug !== item.slug &&
    candidate.capabilityGroup === item.capabilityGroup &&
    !selected.some((link) => link.slug === candidate.slug),
  );
  for (let index = 0; selected.length < 3 && index < sameGroup.length; index += 1) {
    selected.push(sameGroup[index]);
  }
  for (const candidate of sameGroup) {
    if (selected.length >= 6) break;
    if (!selected.some((link) => link.slug === candidate.slug)) selected.push(candidate);
  }
  return selected;
}

export const FLEET_LINKS = [
  { slug: "dji-osmo-pocket-4", anchor: "Field capture: pocket camera for field capture" },
  { slug: "blackmagic-ursa-broadcast-g2", anchor: "Broadcast camera: broadcast camera for multi-camera work" },
  { slug: "accsoon-cineview-master-4k", anchor: "Wireless video transmission: wireless video transmission" },
  { slug: "amaran-ray-360c", anchor: "Stage lighting: COB light for stage and interview" },
  { slug: "fujinon-digi-power-a22x7-8berd-s48b-78-172mm-f1-8-2-3-b4-mount", anchor: "Broadcast optics: long-lens sport and broadcast zoom" },
  { slug: "decklink-quad-2", anchor: "Capture and playout: capture and playout cards" },
] as const;

export const VIDEO_EQUIPMENT_LINKS = {
  cameras: { slug: "blackmagic-ursa-broadcast-g2", anchor: "broadcast camera body" },
  lenses: { slug: "fujinon-digi-power-a22x7-8berd-s48b-78-172mm-f1-8-2-3-b4-mount", anchor: "long-lens broadcast optics" },
  field: { slug: "dji-osmo-pocket-4", anchor: "single-operator field capture" },
  lighting: { slug: "amaran-ray-360c", anchor: "stage and interview lighting" },
} as const;

export const OB_VAN_EQUIPMENT_LINKS = {
  cameras: { slug: "blackmagic-ursa-broadcast-g2", anchor: "URSA Broadcast G2" },
  lenses: { slug: "fujinon-digi-power-a22x7-8berd-s48b-78-172mm-f1-8-2-3-b4-mount", anchor: "Fujinon A22x7.8 broadcast lens" },
} as const;

export function equipmentHref(slug: string, items: Equipment[]) {
  const item = items.find((candidate) => candidate.slug === slug);
  if (!item?.category?.slug) throw new Error(`Equipment "${slug}" was not found or has no category`);
  return `/equipment/${item.category.slug}/${item.slug}`;
}
