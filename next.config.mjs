import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const config = {
  reactStrictMode: true,
  async redirects() {
    const renamedCases = {
      "nested-lands-tv-show-teaser-trailer": "nested-lands-game-teaser-trailer",
      "iem-masters-cologne": "iem-cologne",
    };
    return ["", "/de", "/fr", "/pl", "/lt"].flatMap((prefix) => Object.entries(renamedCases).map(([from, to]) => ({
      source: `${prefix}/portfolio/${from}`,
      destination: `${prefix}/portfolio/${to}`,
      permanent: true,
    })));
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default withNextIntl(config);
