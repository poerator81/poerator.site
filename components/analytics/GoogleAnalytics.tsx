import Script from "next/script";

const GA_MEASUREMENT_ID = "G-174G6HWHWY";

export function GoogleAnalytics() {
  return <>
    <Script id="google-analytics-consent" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('consent','default',{'analytics_storage':'denied','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':500});`}
    </Script>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
    <Script id="google-analytics-config" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}');`}
    </Script>
  </>;
}
