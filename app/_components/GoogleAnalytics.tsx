// Design philosophy: the GA4 tag is deferred until after hydration so measurement
// never competes with the hero's first paint. It renders from the root layout, so
// every route — static pages and the Keystatic-backed blog alike — is counted once.
import Script from "next/script";

const measurementId = "G-XKMPRYNWCQ";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}');`}
      </Script>
    </>
  );
}
