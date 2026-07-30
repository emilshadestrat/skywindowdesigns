# SEO Audit Report — Sky Window Design & More

**Audit date:** July 31, 2026  
**Site:** https://skywindowdesign.com  
**Tech stack:** React 19 + Vite (client-side rendered SPA), Express server, Wouter routing  
**Business type:** Local Service (Window Treatments — Orange Beach, AL)

---

## Executive Summary

| Category | Score | Status |
|----------|-------|--------|
| Technical SEO | 4/10 | Critical issues |
| Schema / Structured Data | 6/10 | Good foundation, gaps remain |
| AI Search Readiness (AEO/GEO) | 3/10 | Major gaps |
| On-Page SEO | 7/10 | Solid foundation |
| Content Quality (E-E-A-T) | 7/10 | Good for a local business |
| **Overall SEO Health** | **5.4/10** | **Needs immediate attention** |

The site has a well-structured information architecture, consistent on-page SEO, and valid schema markup on key pages. However, the **client-side rendering approach is the single biggest SEO risk** — all meta tags, canonical URLs, and JSON-LD schema are injected via JavaScript at runtime, meaning crawlers that don't execute JS see an empty page. Combined with missing `robots.txt`, missing `sitemap.xml`, and no `llms.txt` for AI engines, the site is significantly under-optimized for both traditional and AI search.

---

## 1. Technical SEO

### 1.1 Client-Side Rendering (CRITICAL)

The site is a pure React SPA. The `Seo` component injects `<title>`, `<meta description>`, `<link rel="canonical">`, and `<script type="application/ld+json">` tags via `document.title` and `document.createElement` inside `useEffect` — meaning **none of this content exists in the initial HTML response**.

**Impact:**
- Googlebot does render JavaScript, but with a **delay of days to weeks** for the secondary render pass [1]. Content and meta tags are not seen on the first crawl.
- Bingbot and other crawlers may not execute JavaScript at all, seeing only the bare `<title>` and `<meta description>` from `index.html`.
- Social media crawlers (Facebook, LinkedIn, X/Twitter) do **not** execute JavaScript, so Open Graph tags are invisible when links are shared — the `og:title`, `og:description`, and `og:image` tags set by the `Seo` component are never read.

**Recommendation:** Implement **prerendering or server-side rendering (SSR)** so that the initial HTML response contains all meta tags, canonical URLs, and JSON-LD schema. Options:

| Approach | Effort | Effectiveness |
|----------|--------|---------------|
| Vite SSG plugin (vite-plugin-ssg) | Medium | Pre-renders all static routes at build time; ideal for a site with ~25 pages |
| Express middleware bot detection | Low | Serve pre-rendered HTML snapshots to known bots |
| Manual prerender script | Low | Generate static HTML for each route at build time using Puppeteer |
| Migrate to Next.js | High | Full SSR/SSG with built-in SEO support |

The **Vite SSG plugin** is the recommended approach — it pre-renders all routes at build time, producing static HTML files with full meta tags and schema, while keeping the existing React + Vite stack.

### 1.2 Missing robots.txt (CRITICAL)

There is no `robots.txt` file in `client/public/`. Without it:
- Crawlers use default behavior (crawl everything), which is not optimal
- You cannot point crawlers to your sitemap
- You cannot control AI bot access (see Section 3)

**Recommendation:** Create `client/public/robots.txt`:

```
User-agent: *
Allow: /

# AI Crawlers — allow for citation/search
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Disallow: /

Sitemap: https://skywindowdesign.com/sitemap.xml
```

### 1.3 Missing sitemap.xml (CRITICAL)

There is no XML sitemap. The site has **25 indexable URLs** (home, 12 service pages, 6 city pages, 2 hub pages, contact, about, blog, privacy, accessibility). Without a sitemap, Google must discover all pages through crawling — which is unreliable for a JS-rendered SPA.

**Recommendation:** Create `client/public/sitemap.xml` listing all 25 URLs with `lastmod` dates. A static sitemap is sufficient since the site content changes infrequently.

### 1.4 Missing favicon and manifest.json (LOW)

There is no `favicon.ico` or `manifest.json` in `client/public/`. The logo is loaded from Manus storage, but there's no favicon for browser tabs or PWA support.

### 1.5 Canonical URLs (GOOD)

All pages set canonical URLs via the `Seo` component. The URLs use the `https://skywindowdesign.com` domain with no trailing slashes, which is consistent across the site. The `index.html` fallback title and description are reasonable as a default.

### 1.6 Express Server — SPA Fallback (GOOD)

The Express server correctly falls back to `index.html` for all routes (`app.get("*")`), ensuring client-side routing works. However, it does not serve `robots.txt` or `sitemap.xml` from a custom route — these would need to be in the `dist/public` directory after build.

### 1.7 Viewport Meta Tag (GOOD)

The viewport meta tag is `width=device-width, initial-scale=1.0` — the `maximum-scale=1` issue was already fixed in the previous round.

---

## 2. Schema Markup Audit

### 2.1 Current Schema Coverage

| Page Type | Schema Types Present | Status |
|-----------|----------------------|--------|
| Homepage | `LocalBusiness`, `WebSite`, `FAQPage` | Good — missing `sameAs`, `logo`, `image`, `priceRange` |
| Service pages (12) | `Service` (with `LocalBusiness` provider) | Good — missing `FAQPage`, `BreadcrumbList` |
| City pages (6) | `Service`, `BreadcrumbList`, `FAQPage` | Excellent — most complete schema on the site |
| Service Areas hub | `BreadcrumbList` only | Missing — should have `CollectionPage` or `ItemList` |
| Design Services hub | `BreadcrumbList` only | Missing — should have `CollectionPage` or `ItemList` |
| Blog | `BreadcrumbList` only | Acceptable for a placeholder page |
| Contact | `ContactPage` + `LocalBusiness` | Good — missing `openingHours` in ContactPage schema |
| About, Privacy, Accessibility | None | Acceptable — non-commercial pages |
| 404 | None | Correct — should not have schema |

### 2.2 Homepage LocalBusiness Schema — Missing Properties

The homepage `LocalBusiness` schema is missing several recommended properties:

| Property | Status | Value to Add |
|----------|--------|-------------|
| `@id` | Missing | `https://skywindowdesign.com/#business` (uniquely identifies the business) |
| `url` | Missing | `https://skywindowdesign.com/` |
| `image` | Missing | Logo URL or showroom photo |
| `logo` | Missing | Logo URL (same as `image` or separate) |
| `priceRange` | Missing | `$$` |
| `sameAs` | Missing | Facebook and Instagram profile URLs |
| `geoCoordinates` | Missing | Latitude/longitude of showroom |
| `hasMap` | Missing | Google Maps URL |
| `currenciesAccepted` | Missing | `USD` |
| `paymentAccepted` | Missing | `Cash, Credit Card, Check` |

### 2.3 Service Pages — Missing FAQPage and BreadcrumbList

The StandardPage component generates a `Service` schema but does **not** include `FAQPage` or `BreadcrumbList` schema, even though:
- Each service page has 4 FAQ items rendered in the UI
- Each service page has breadcrumbs (Home > [Service])

The CityPage component correctly includes both `FAQPage` and `BreadcrumbList` — the StandardPage should follow the same pattern.

### 2.4 Hub Pages — Missing ItemList Schema

The Service Areas and Design Services hub pages list multiple child pages but only have `BreadcrumbList` schema. Adding an `ItemList` or `CollectionPage` schema would help search engines understand the relationship between the hub and child pages.

### 2.5 FAQPage Schema — Google Rich Results Note

Google retired FAQ rich results for all sites on May 7, 2026 [2]. FAQPage schema no longer produces FAQ rich snippets in Google SERP. However, FAQPage schema still benefits **AI search engines** (ChatGPT, Perplexity, Claude) that parse structured data for answer extraction [3]. The recommendation is to **keep existing FAQPage schema** for AI citation benefit, but not to add new FAQPage schema specifically for Google SERP.

### 2.6 Schema Validation Issues

- The `Service` schema on StandardPage uses `data.schemaType` which is set to `"Service"` for all pages — this is correct for service pages but the `about` page also uses `Service` type, which is semantically incorrect (should be `AboutPage` or `WebPage`).
- The `ContactPage` schema type is not a recognized schema.org type — it should be `WebPage` with `ContactPage` as an additional type, or simply `LocalBusiness` with a `contactPoint` property.

---

## 3. AI Search Readiness (AEO/GEO)

### 3.1 AI Bot Access (CRITICAL)

Without a `robots.txt` file, AI crawlers have no explicit guidance. While the default behavior is to allow crawling, several AI bots (GPTBot, ClaudeBot, PerplexityBot) check for explicit `Allow` rules. Without them, some AI engines may skip the site entirely.

**Recommendation:** Add the AI bot rules shown in Section 1.2 to `robots.txt`.

### 3.2 Missing llms.txt (HIGH)

There is no `llms.txt` file. The `llms.txt` convention (proposed by answerthepublic.com, adopted by sites like Anthropic, Perplexity) provides a markdown summary of the site for AI models to read [4]. For a local business, this file should include:
- Business name, location, and contact info
- Services offered
- Service areas
- Key URLs

**Recommendation:** Create `client/public/llms.txt`:

```markdown
# Sky Window Design & More

> Custom window treatments for Orange Beach, Alabama and the Gulf Coast.

Sky Window Design & More is a local window treatment company based in Orange Beach, AL, serving the Alabama and Florida Gulf Coast. We offer roller shades, motorized shades, plantation shutters, cellular shades, Roman shades, custom blinds, draperies, wallpaper, interior design, and commercial window treatments. Free in-home consultations are available.

## Services
- [Window Treatments](https://skywindowdesign.com/window-treatments)
- [Roller Shades](https://skywindowdesign.com/roller-shades)
- [Motorized Shades](https://skywindowdesign.com/motorized-shades)
- [Plantation Shutters](https://skywindowdesign.com/plantation-shutters)
- [Cellular Shades](https://skywindowdesign.com/cellular-honeycomb-shades)
- [Roman Shades](https://skywindowdesign.com/roman-shades)
- [Custom Blinds](https://skywindowdesign.com/blinds)
- [Draperies & Curtains](https://skywindowdesign.com/draperies-curtains)
- [Wallpaper & Interior Design](https://skywindowdesign.com/wallpaper-interior-design)
- [Commercial Window Treatments](https://skywindowdesign.com/commercial-window-treatments)
- [Window Treatment Repairs](https://skywindowdesign.com/window-treatment-repairs)

## Service Areas
- [All Service Areas](https://skywindowdesign.com/service-areas)
- [Gulf Shores, AL](https://skywindowdesign.com/locations/gulf-shores-al)
- [Foley, AL](https://skywindowdesign.com/locations/foley-al)
- [Fairhope, AL](https://skywindowdesign.com/locations/fairhope-al)
- [Pensacola, FL](https://skywindowdesign.com/locations/pensacola-fl)
- [Gulf Breeze, FL](https://skywindowdesign.com/locations/gulf-breeze-fl)
- [Navarre, FL](https://skywindowdesign.com/locations/navarre-fl)

## Contact
- Phone: (251) 206-7319
- Email: lance@skywindowdesign.com
- Address: 25405 Perdido Beach Blvd., Suite 7A, Orange Beach, AL 36561
- Hours: Mon–Fri 10am–5pm, Sat 10am–3pm, Sun closed
```

### 3.3 Content Extractability (MEDIUM)

The service pages follow the Solomon Shade Solutions pattern with clear section headings ("What It Is", "Built to Last", "How It Works", FAQ). This structure is good for AI extraction. However, several improvements would boost citability:

- **Definition blocks:** Each service page should open with a 40-60 word direct answer to "What is [product]?" — the current hero section has bullet points but no concise definition paragraph.
- **Comparison tables:** No comparison tables exist for "Roller Shades vs. Cellular Shades" or "Motorized vs. Manual" queries — these are common AI search queries.
- **Statistics:** No specific numbers (e.g., "UV blocking up to 99%", "energy savings of 10-25%") — statistics boost AI citation by 37% [3].

### 3.4 Third-Party Presence (MEDIUM)

AI engines cite third-party sources 6.5x more often than first-party domains [3]. The site has Facebook and Instagram links in the footer but no:
- Google Business Profile (critical for local AI queries like "window treatments near me")
- Yelp or Houzz profile
- BBB listing
- Industry directory listings

### 3.5 Query Fan-Out Coverage (MEDIUM)

Google's AI search generates related queries (fan-out) beyond the user's search. For "window treatments Orange Beach AL", the AI may fan out to:
- "best window treatments for coastal homes"
- "motorized shades vs manual shades"
- "plantation shutters vs blinds for humidity"
- "how to choose window treatments for a beach house"

The site does not currently have content targeting these fan-out queries. Adding a blog article or FAQ section addressing coastal-specific concerns would improve topical coverage.

---

## 4. On-Page SEO

### 4.1 Title Tags (GOOD)

All pages have unique, descriptive title tags with the brand name. Examples:
- `Roller Shades in Orange Beach, AL | Sky Window Design & More`
- `Plantation Shutters in Orange Beach, AL | Sky Window Design & More`
- `Service Areas | Sky Window Design & More`

The titles follow a consistent pattern: `[Product/Service] in [Location] | Sky Window Design & More`.

### 4.2 Meta Descriptions (GOOD)

All pages have unique meta descriptions between 140-160 characters. They include relevant keywords and a call to action.

### 4.3 Heading Structure (GOOD)

All pages have exactly one H1, followed by H2s for major sections and H3s for subsections. The heading hierarchy is logical and consistent.

### 4.4 Image Alt Text (GOOD with gaps)

Most images have descriptive alt text:
- Product images: `alt={data.schemaName}` or `alt={section.heading}`
- Hero images: `alt="Custom window treatments in a bright coastal living room in Orange Beach, Alabama"`
- Decorative images: `alt=""` with `aria-hidden="true"` (correct for decorative images)

**Gap:** The StandardPage hero image uses `alt=""` (empty) — it should have descriptive alt text since it's a content image, not decorative.

### 4.5 Internal Linking (GOOD)

The site has a well-structured internal linking pattern:
- Nav dropdowns link to all service pages
- Footer links to all pages
- Service pages link to related products and city pages
- City pages link to other city pages
- Hub pages link to all child pages

**Gap:** The `about` page uses the `StandardPage` component but doesn't have related links or city cross-links configured in siteData.ts.

### 4.6 URL Structure (GOOD)

URLs are clean, descriptive, and use hyphens:
- `/roller-shades`, `/motorized-shades`, `/plantation-shutters`
- `/locations/gulf-shores-al`, `/locations/pensacola-fl`
- `/service-areas`, `/design-services`

The `/locations/` prefix for city pages is slightly suboptimal — `/service-areas/gulf-shores-al` would be more semantically aligned with the hub page at `/service-areas`, but this is a minor point.

---

## 5. Prioritized Recommendations

### Priority 1 — Critical (fix immediately)

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| 1 | Implement prerendering/SSG so meta tags and schema exist in initial HTML | Medium-High | Without this, all other SEO work is delayed by JS rendering |
| 2 | Create `robots.txt` with AI bot Allow rules | Low | Enables crawler guidance and AI bot access |
| 3 | Create `sitemap.xml` with all 25 URLs | Low | Ensures all pages are discoverable |

### Priority 2 — High (fix within 1 week)

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| 4 | Create `llms.txt` for AI engine context | Low | Improves AI citation probability |
| 5 | Add `FAQPage` + `BreadcrumbList` schema to StandardPage | Low | Brings service pages to same schema level as city pages |
| 6 | Enrich homepage `LocalBusiness` schema with `sameAs`, `logo`, `image`, `priceRange`, `geoCoordinates` | Low | Improves Knowledge Graph eligibility |
| 7 | Add `ItemList` schema to hub pages (Service Areas, Design Services) | Low | Helps search engines understand hub-child relationships |
| 8 | Fix `about` page schema type from `Service` to `AboutPage` | Low | Semantic correctness |

### Priority 3 — Medium (fix within 1 month)

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| 9 | Add 40-60 word definition blocks to service pages | Low | Improves AI answer extraction |
| 10 | Add comparison tables for common "X vs Y" queries | Medium | Targets comparison AI queries |
| 11 | Add coastal-specific statistics with sources | Medium | Statistics boost AI citation by 37% [3] |
| 12 | Create Google Business Profile if not already active | Medium | Critical for local AI queries and Map Pack |
| 13 | Fix StandardPage hero image alt text (currently empty) | Low | Accessibility and image SEO |
| 14 | Add `favicon.ico` and `manifest.json` | Low | Browser tab display, PWA support |

### Priority 4 — Low (backlog)

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| 15 | Add blog articles targeting coastal window treatment queries | Medium | Builds topical authority for AI fan-out queries |
| 16 | Get listed on Yelp, Houzz, BBB | Medium | Third-party presence for AI citation |
| 17 | Add `Organization` schema to homepage in addition to `LocalBusiness` | Low | Additional entity definition |
| 18 | Consider migrating city URLs from `/locations/` to `/service-areas/` | Medium | Better URL-hub alignment (requires 301 redirects) |

---

## 6. Schema Implementation Details

### 6.1 Recommended Homepage LocalBusiness Schema (Enriched)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://skywindowdesign.com/#business",
  "name": "Sky Window Design & More",
  "legalName": "Sky Window Design & More, LLC",
  "description": "Custom window treatments for Orange Beach, Alabama and the Gulf Coast. Roller shades, plantation shutters, motorized shades, draperies, and more.",
  "url": "https://skywindowdesign.com/",
  "telephone": "+12512067319",
  "email": "lance@skywindowdesign.com",
  "image": "https://skywindowdesign.com/manus-storage/showroom-photo.jpg",
  "logo": "https://skywindowdesign.com/manus-storage/sky-logo.png",
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Credit Card, Check",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "25405 Perdido Beach Blvd., Suite 7A",
    "addressLocality": "Orange Beach",
    "addressRegion": "AL",
    "postalCode": "36561",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.2658,
    "longitude": -87.5833
  },
  "hasMap": "https://maps.google.com/?cid=XXXXX",
  "sameAs": [
    "https://www.facebook.com/skywindowdesign",
    "https://www.instagram.com/skywindowdesign"
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "10:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "10:00",
      "closes": "15:00"
    }
  ]
}
```

### 6.2 Recommended Service Page Schema (with FAQPage + BreadcrumbList)

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Roller Shades",
    "provider": { "@id": "https://skywindowdesign.com/#business" },
    "areaServed": [
      { "@type": "State", "name": "Alabama" },
      { "@type": "State", "name": "Florida" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skywindowdesign.com/" },
      { "@type": "ListItem", "position": 2, "name": "Roller Shades", "item": "https://skywindowdesign.com/roller-shades" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is included in a free consultation for roller shades?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We discuss the room, compare product options, review measurements and confirm the project details. There is no obligation to purchase."
        }
      }
    ]
  }
]
```

### 6.3 Recommended Hub Page Schema (ItemList)

```json
[
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skywindowdesign.com/" },
      { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": "https://skywindowdesign.com/service-areas" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Sky Window Design Service Areas",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Gulf Shores, AL", "url": "https://skywindowdesign.com/locations/gulf-shores-al" },
      { "@type": "ListItem", "position": 2, "name": "Foley, AL", "url": "https://skywindowdesign.com/locations/foley-al" },
      { "@type": "ListItem", "position": 3, "name": "Fairhope, AL", "url": "https://skywindowdesign.com/locations/fairhope-al" },
      { "@type": "ListItem", "position": 4, "name": "Pensacola, FL", "url": "https://skywindowdesign.com/locations/pensacola-fl" },
      { "@type": "ListItem", "position": 5, "name": "Gulf Breeze, FL", "url": "https://skywindowdesign.com/locations/gulf-breeze-fl" },
      { "@type": "ListItem", "position": 6, "name": "Navarre, FL", "url": "https://skywindowdesign.com/locations/navarre-fl" }
    ]
  }
]
```

---

## 7. Tech Stack SEO Verdict

| Aspect | Status | Notes |
|--------|--------|-------|
| Rendering | Client-side only (CSR) | Meta tags and schema injected via JS — not in initial HTML |
| Routing | Wouter (client-side) | No server-side route handling for SEO |
| Meta tags | Runtime injection via `useEffect` | Invisible to non-JS crawlers and social preview bots |
| Schema | Runtime injection via `useEffect` | Same issue as meta tags |
| robots.txt | Missing | No crawler guidance |
| sitemap.xml | Missing | No crawl discovery aid |
| llms.txt | Missing | No AI engine context |
| Canonical URLs | Runtime injection | Correct values, but not in initial HTML |
| Open Graph | Runtime injection | Social sharing previews will be blank |
| Performance | Vite build, code-split | Good bundle sizes, but no prerendering |

**Verdict:** The tech stack is **not SEO-friendly** in its current configuration. The fundamental issue is that all SEO-critical content (meta tags, canonical URLs, schema markup) is injected via JavaScript, which means it is invisible to crawlers that don't execute JS and delayed for crawlers that do. The **highest-impact fix** is implementing prerendering/SSG so that the initial HTML response contains all SEO content.

---

## References

1. Google Search Central. "JavaScript SEO basics." https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
2. Google Search Central. "FAQ rich results retired." https://developers.google.com/search/docs/appearance/structured-data/faqpage
3. Princeton University. "GEO: Generative Engine Optimization." KDD 2024. https://arxiv.org/abs/2311.09735
4. llmstxt.org. "The llms.txt convention." https://llmstxt.org
