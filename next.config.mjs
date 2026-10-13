import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/ob-van-rental-berlin",
        destination: "/ob-van",
        permanent: true,
      },
      {
        source: "/:locale(de|fr|pl|lt)/ob-van-rental-berlin",
        destination: "/:locale/ob-van",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default withNextIntl(config);
