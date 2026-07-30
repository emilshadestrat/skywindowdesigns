# UI/UX, Navigation & Site Architecture Review
## Sky Window Design & More — Current Implementation vs. Copy Doc & Best Practices

**Author:** Manus AI  
**Date:** July 30, 2026  
**Sources:** Approved copy doc (highest authority), master prompt §1 conflict table, ui-ux-pro-max design intelligence, site-architecture skill, current implementation in `/home/ubuntu/sky-window-design/`

---

## 1. Navigation Bar — Issues & Recommendations

### 1.1 Too Many Top-Level Items

The current desktop nav has **8 top-level items** plus a dropdown:

| # | Label | Type |
|---|---|---|
| 1 | Window Treatments | Dropdown (5 children) |
| 2 | Motorized Shades | Direct link |
| 3 | Draperies and Curtains | Direct link |
| 4 | Shutters | Direct link |
| 5 | Commercial | Direct link |
| 6 | Visualizer | Direct link |
| 7 | About | Direct link |
| 8 | Contact | Direct link |

**Problem:** Research on navigation capacity shows that users struggle to scan more than 5–7 top-level items reliably [1]. With 8 items plus a dropdown, the nav bar is overloaded for a local service business. The floating white pill design from CONTACTUS.png compounds this — the pill narrows the available width, causing items to wrap or compress on tablets.

**Recommendation:** Consolidate to **5 top-level items** using a single "Products" or "Window Treatments" dropdown that contains all 8 product/service pages. The copy doc's sitemap groups everything under "Window Treatments" as the parent hub, so the nav should reflect that hierarchy.

| Proposed # | Label | Type | Children |
|---|---|---|---|
| 1 | Window Treatments | Dropdown | Roller Shades, Motorized Shades, Draperies & Curtains, Plantation Shutters, Cellular Shades, Roman Shades, Custom Blinds |
| 2 | Design Services | Dropdown | Wallpaper & Interior Design, Commercial Window Treatments, Visualizer, Repairs |
| 3 | Service Areas | Dropdown | Gulf Shores, Foley, Fairhope, Pensacola, Gulf Breeze, Navarre |
| 4 | About | Direct link | — |
| 5 | Contact | Direct link (CTA-styled) | — |

This reduces cognitive load from 8+1 to 3+2, matches the copy doc's hub-and-spoke architecture, and gives the floating pill enough breathing room.

### 1.2 Dropdown Inconsistency — Motorized Shades Splits from Parent

Currently "Motorized Shades" sits as a standalone top-level item while "Roller Shades," "Cellular Shades," "Roman Shades," and "Blinds" are nested under the "Window Treatments" dropdown. The copy doc treats all 7 product pages as siblings under the `/window-treatments/` hub. Motorized Shades is no more important than the others — it just happens to have cross-links from more pages.

**Recommendation:** Move Motorized Shades into the Window Treatments dropdown. It should not be a standalone top-level item.

### 1.3 Draperies and Curtains + Shutters as Standalone Items

Same issue. "Draperies and Curtains" and "Shutters" (labeled "Plantation Shutters" in the dropdown but "Shutters" at top level) are standalone top-level items while their siblings are in the dropdown. This is architecturally inconsistent.

**Recommendation:** Move both into the Window Treatments dropdown. Keep the dropdown to 7 items max — if it feels long, split into "Shades" (Roller, Cellular, Roman, Motorized) and "Structural" (Shutters, Blinds, Draperies) sub-groups.

### 1.4 Missing "Service Areas" in Navigation

The copy doc specifies 6 city pages that are only accessible via the footer. No top-level navigation exposes them. For a local SEO strategy targeting Gulf Coast cities, this is a significant gap — users searching for "window treatments Gulf Shores" who land on the homepage have no nav path to their city page.

**Recommendation:** Add a "Service Areas" dropdown to the nav with all 6 city pages. This is standard practice for multi-city local service businesses [2].

### 1.5 "Visualizer" in Top Nav

The visualizer is a tool/utility page, not a core service. Placing it at the same visual weight as "Window Treatments" and "Contact" overstates its importance. The copy doc places it as a child of the Window Treatments hub.

**Recommendation:** Move Visualizer into the "Design Services" dropdown or under Window Treatments. It should not compete with Contact for top-level attention.

### 1.6 Contact Should Be a CTA Button

Currently "Contact" is styled the same as other nav items. Best practice for lead-generation sites is to make the primary conversion action visually distinct — a filled or outlined button that stands apart from navigation links [3].

**Recommendation:** Style "Contact" as a filled blue button (or "Get a Quote" per the CONTACTUS.png reference) at the right edge of the nav pill. This gives it the visual weight of a CTA, not a navigation link.

---

## 2. Site Structure — Issues & Recommendations

### 2.1 Breadcrumb Hierarchy Mismatches

The copy doc specifies a clear breadcrumb hierarchy, but several pages have flat `Home > Page` breadcrumbs when they should be nested under a parent:

| Page | Current Breadcrumb | Copy Doc Breadcrumb | Issue |
|---|---|---|---|
| Wallpaper & Interior Design | Home > Wallpaper and Interior Design | Home > Window Treatments > Wallpaper and Interior Design | Missing parent |
| Commercial Window Treatments | Home > Commercial Window Treatments | Home > Window Treatments > Commercial Window Treatments | Missing parent |
| Visualizer | Home > Visualizer | Home > Window Treatments > Visualizer | Missing parent |
| Window Treatment Repairs | Home > Repairs | Home > Window Treatments > Repairs | Missing parent |

**Recommendation:** Update breadcrumbs in `siteData.ts` to match the copy doc's hierarchy. This matters for both UX (wayfinding) and SEO (structured data in BreadcrumbList schema).

### 2.2 Internal Link Gaps — Product Pages Don't Cross-Link

The copy doc's internal link map specifies rich cross-linking between product pages. For example:

- **Roller Shades** should link out to: Window Treatments hub, Motorized Shades, Cellular Shades, Contact
- **Motorized Shades** should link out to: Roller Shades, Cellular Shades, Roman Shades, Commercial, Contact
- **Draperies & Curtains** should link out to: Roman Shades, Wallpaper and Interior Design, Window Treatments hub, Contact

Currently, every product page's CTAs point only to `/contact` and `tel:+12512067319`. The copy doc's cross-links are not implemented anywhere in the page body or sidebar.

**Recommendation:** Add a "Related Services" or "Explore More" section to the StandardPage component that renders the copy doc's specified cross-links as cards or a link list. This is critical for SEO (internal link equity distribution) and UX (discovery paths between related products).

### 2.3 City Pages Lack Curated Product Cross-Links

The copy doc says each city page should link to "locally relevant product pages." Currently, all 6 city pages render the same `PRODUCT_CARDS.slice(0, 6)` — the same 6 products in the same order. There is no per-city curation.

**Recommendation:** Add a `relatedProducts` array to each city page in `CITY_PAGES` data, specifying which product cards to show. For example, Gulf Shores (beachfront condos) might prioritize Solar/Roller Shades and Cellular Shades, while Fairhope (historic homes) might prioritize Plantation Shutters and Roman Shades.

### 2.4 No "Service Areas" Landing Page

The footer lists 6 city pages, but there is no `/locations/` or `/service-areas/` hub page that introduces the service area concept and links to all 6 cities. This is a missed SEO opportunity — "window treatments Gulf Coast Alabama" or "window treatments Baldwin County" could capture broader regional searches.

**Recommendation:** Consider adding a `/service-areas/` hub page (not in the original 21-page sitemap, so this would need client approval). At minimum, the footer's "Service Area" column should have a header that links to a page explaining the service area, or the 6 city links should be introduced with a brief "Areas We Serve" label.

### 2.5 Visualizer Page Has No Functional Tool

The visualizer page is currently a text-only StandardPage with two CTAs both pointing to `/contact`. The copy doc describes it as a tool to "explore window treatment styles, fabrics and operating options." There is no interactive element — no product selector, no image gallery, no room scene viewer.

**Recommendation:** Either (a) build a simple product-type selector that filters product cards by room/goal, or (b) if the visualizer tool is not ready for launch, rename the page to "Explore Window Treatment Styles" and reframe it as a gallery/inspiration page rather than a "visualizer." The current page sets an expectation the UI doesn't meet.

---

## 3. Overall UI/UX — Issues & Recommendations

### 3.1 CTA Density — Every Page Ends With the Same Pattern

Every StandardPage and CityPage ends with: (1) a sidebar CTA card, (2) a dark CTA band at the bottom. The homepage also has a CTA band. This creates a repetitive rhythm where the user sees the same "Schedule a Consultation + Call" pattern 3+ times per page.

**Recommendation:** Vary the final CTA by page type. Product pages could end with a "Compare Related Products" section + a soft CTA. City pages could end with a "Visit Our Orange Beach Showroom" section with a map. The dark CTA band should appear only on the homepage and maybe the Window Treatments hub — not on every single page.

### 3.2 No Breadcrumb Trail Visible on Page

Breadcrumbs are defined in the data and schema but are not rendered in the UI. The Layout component receives a `breadcrumb` prop but doesn't display it. Users on deep pages (e.g., `/roller-shades/`) have no visible way to navigate back to the hub.

**Recommendation:** Add a visible breadcrumb trail below the header on all subpages. This is a standard UX pattern for sites with 2+ levels of hierarchy [4] and directly supports the BreadcrumbList schema already in the page.

### 3.3 Mobile Navigation — 13 Flat Links

The mobile nav (`MOBILE_NAV_LINKS`) is a flat list of 13 links with no grouping. On mobile, this requires significant scrolling and doesn't communicate the site's information architecture.

**Recommendation:** Group mobile links under expandable sections matching the desktop dropdowns: "Window Treatments (7)," "Design Services (4)," "Service Areas (6)," "About," "Contact." Use accordion-style expand/collapse.

### 3.4 Trust Bar — Only 2 Items on Homepage

The homepage hardcodes 3 trust items in the blue bar but `TRUST_ITEMS` in siteData only has 2. The third item ("Financing Available") was dropped per the master prompt §1 conflict resolution. The homepage renders a third item ("Custom Design Consultations") that isn't in the data file.

**Recommendation:** Either add "Custom Design Consultations" to `TRUST_ITEMS` in siteData.ts so the data is the single source of truth, or reduce the homepage to 2 items. Currently the code and data are out of sync.

### 3.5 No Search or Site Map

For a 24-page site, there is no search functionality or HTML sitemap. Users who can't find what they need through nav have no fallback.

**Recommendation:** Add a simple site search (even a basic input that filters page titles) to the 404 page and possibly the footer. Add an HTML sitemap at `/sitemap/` or link the XML sitemap in the footer.

### 3.6 Footer Missing Key Elements

The current footer has 3 link columns (Services, More Services, Service Area) but is missing:

- **Contact info** (phone, email, address, hours) — standard for local business footers
- **Social media links** — if the client has Facebook/Instagram
- **Copyright notice** — legal requirement
- **Privacy & Accessibility links** — the pages exist but aren't linked in the footer

**Recommendation:** Add a 4th column or a bottom row with NAP info, privacy/accessibility links, and copyright. The copy doc's footer spec includes these.

### 3.7 Image Alt Text — Partially Implemented

Product card images have alt text, but the hero image and showroom image alt text should be verified for keyword inclusion. The copy doc doesn't specify alt text (it's one of the few things I'm authorized to author), but it should include the primary keyword for each page.

**Recommendation:** Audit all `<img>` tags and ensure each alt attribute includes the page's primary keyword naturally. For example, the roller shades page hero should have `alt="Roller shades in an Orange Beach, Alabama home"` not just `alt="Roller Shades"`.

---

## 4. Summary — Priority-Ordered Action Items

| Priority | Issue | Impact | Effort |
|---|---|---|---|
| **P0** | Navigation has 8 top-level items — consolidate to 5 | High UX + visual | Medium |
| **P0** | No visible breadcrumb trail on subpages | High UX + SEO | Low |
| **P0** | Product pages don't cross-link per copy doc map | High SEO | Medium |
| **P1** | Breadcrumb hierarchy mismatches for 4 pages | Medium SEO | Low |
| **P1** | Contact not styled as CTA button in nav | Medium conversion | Low |
| **P1** | City pages all show same 6 products — no curation | Medium SEO + UX | Medium |
| **P1** | Mobile nav is flat 13-link list — group into sections | Medium UX | Low |
| **P1** | Footer missing NAP, privacy/accessibility links, copyright | Medium legal + UX | Low |
| **P2** | CTA density repetitive — every page ends same way | Medium UX | Medium |
| **P2** | Visualizer page has no interactive element | Medium UX | High |
| **P2** | TRUST_ITEMS data/code mismatch | Low consistency | Low |
| **P2** | No service-areas hub page | Low SEO | Medium |
| **P3** | No site search or HTML sitemap | Low UX | Medium |
| **P3** | Image alt text needs keyword audit | Low SEO | Low |

---

## References

[1] [Navigation Design: How Many Items Are Too Many?](https://www.nngroup.com/articles/menu-structure/) — Nielsen Norman Group  
[2] [Local SEO: Service Area Pages](https://www.searchenginejournal.com/local-seo-service-area-pages/) — Search Engine Journal  
[3] [CTA Button Design Best Practices](https://www.smashingmagazine.com/cta-button-design/) — Smashing Magazine  
[4] [Breadcrumb Navigation UX](https://www.nngroup.com/articles/breadcrumbs/) — Nielsen Norman Group
