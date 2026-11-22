import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const config = {
  reactStrictMode: true,
  async redirects() {
    const renamedCases = {
      "nested-lands-tv-show-teaser-trailer": "nested-lands-game-teaser-trailer",
      "iem-masters-cologne": "iem-cologne",
    };
    const renamedEquipment = [
      ["lenses", "fujinon-xa20sx8-5berm-k3-eng-lens", "fujinon-xa20sx8-5berm-k32-3-8-5-170mm-eng-xa-exceed-series-hd-zoom-lens"],
      ["power-batteries", "usb-c-rechargeable-camera-battery-for-sony-np-f970", "smallrig-np-f970-battery-7800-mah"],
      ["cameras", "blackmagicvideo-assist-5-3g", "blackmagic-video-assist-5-3g"],
      ["switching-control", "blackmagic-mini-converteroptical-fiber-12g", "blackmagic-mini-converter-optical-fiber-12g"],
    ];
    return ["", "/de", "/fr", "/pl", "/lt"].flatMap((prefix) => [
      ...Object.entries(renamedCases).map(([from, to]) => ({
        source: `${prefix}/portfolio/${from}`,
        destination: `${prefix}/portfolio/${to}`,
        permanent: true,
      })),
      ...renamedEquipment.map(([category, from, to]) => ({
        source: `${prefix}/equipment/${category}/${from}`,
        destination: `${prefix}/equipment/${category}/${to}`,
        permanent: true,
      })),
    ]);
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default withNextIntl(config);
