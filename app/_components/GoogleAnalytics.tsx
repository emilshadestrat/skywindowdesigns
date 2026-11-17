// Design philosophy: the GA4 tag is deferred until after hydration so measurement
// never competes with the hero's first paint. It renders from the root layout, so
// every route — static pages and the Keystatic-backed blog alike — is counted once.
// Phone links are tracked here with one delegated listener, so every tel: link on
// the site (header, footer, page CTAs, blog, links added later) reports
// phone_click to GA4; form leads fire generate_lead from client/src/lib/submitLead.ts.
import Script from "next/script";

const measurementId = "G-XKMPRYNWCQ";

// The listener runs in the capture phase so a component that stops the click
// can't hide it. GA4 only: no Ads conversion, Meta or GTM event.
export const ga4InitScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}');
document.addEventListener('click', function (event) {
  var link = event.target instanceof Element ? event.target.closest('a[href^="tel:"]') : null;
  if (!link) return;
  gtag('event', 'phone_click', {
    link_url: link.getAttribute('href'),
    link_text: (link.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 100)
  });
}, true);`;

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {ga4InitScript}
      </Script>
    </>
  );
}
