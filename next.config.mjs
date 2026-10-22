import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const config = {
  reactStrictMode: true,
  async redirects() {
    return ["", "/de", "/fr", "/pl", "/lt"].map((prefix) => ({
      source: `${prefix}/portfolio/nested-lands-tv-show-teaser-trailer`,
      destination: `${prefix}/portfolio/nested-lands-game-teaser-trailer`,
      permanent: true,
    }));
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default withNextIntl(config);
