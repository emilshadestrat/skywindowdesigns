# Sky Window Design & More — A2P 10DLC Campaign Package

> **Draft.** Review each field against the campaign form in GoHighLevel (Settings → Phone Numbers → Trust Center → A2P 10DLC) before submitting. It describes the live website as of October 13, 2026, once this change is deployed. It is patterned on the Shenandoah Shutters package, whose campaign was approved with the same website structure.

`tests/legal-a2p.test.ts` fails if the form wording quoted here drifts from `client/src/lib/smsConsent.ts`. If you change the form, change this file in the same commit.

## Before you submit

1. **Brand legal name.** The form, the policy pages and the samples all name **Sky Window Design & More, LLC**. That must match the legal name on the A2P brand registration and the EIN exactly. If the IRS record reads differently (for example "Sky Window Design and More LLC"), change `CONTACT.legalName` in `client/src/lib/siteData.ts` and redeploy before submitting.
2. **The website change is live.** Open https://skywindowdesign.com/contact and check that both SMS checkboxes appear and are unchecked. A reviewer who sees the old form rejects the campaign.
3. **Only text people who opted in.** Any GoHighLevel workflow that texts website leads must filter on the tag `sms-transactional-opt-in` (service texts) or `sms-marketing-opt-in` (promotional texts). A lead without the tag did not consent.
4. **The "only opt-in method" claim is true.** The SMS consent page says the website form is the only way people opt in to texts: no paper forms, keywords, purchased lists or third-party leads. If Sky Window collects consent any other way, tell us so the page and this package can say so.

## Campaign structure

The form collects service and promotional consent with separate checkboxes, so the campaign has to cover both. Shenandoah's package recommended **two campaigns**, Customer Care and Marketing, when the provider allows it. If the sub-account allows only one, register a **Mixed** (or **Low Volume Mixed**) campaign and use the combined description below. Never describe promotional texts as part of a service-only campaign.

## Public evidence URLs

| Evidence | URL |
| --- | --- |
| Live opt-in form (contact page) | https://skywindowdesign.com/contact |
| Same form on a product page | https://skywindowdesign.com/roller-shades |
| SMS consent workflow and disclosure | https://skywindowdesign.com/sms-consent |
| Privacy Policy | https://skywindowdesign.com/privacy |
| Terms of Service | https://skywindowdesign.com/terms-of-service |

## How end users consent (message flow)

Paste into "How do end-users consent to receive messages?":

> End users opt in only through the quote and consultation form on https://skywindowdesign.com. The form appears on the contact page (https://skywindowdesign.com/contact) and on every product and service page. After entering their name, phone and email, the user may select either, both or neither of two optional checkboxes. Neither is preselected or required to submit the form.
>
> Checkbox 1 (service): "I agree to receive service texts from Sky Window Design & More, LLC about consultations, appointments, quotes, installations, and customer support."
>
> Checkbox 2 (promotional): "I agree to receive promotional texts from Sky Window Design & More, LLC about offers and product news."
>
> Beneath the checkboxes the form states: "For either option: Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase." It links to the Privacy Policy (https://skywindowdesign.com/privacy), Terms of Service (https://skywindowdesign.com/terms-of-service) and SMS consent details (https://skywindowdesign.com/sms-consent). Each choice is stored with the contact record. Opt-in data and consent are not shared with third parties.

## Campaign descriptions

**Customer Care / service campaign:**

> Sky Window Design & More, LLC, a custom window treatment showroom in Orange Beach, Alabama, sends text messages only to website visitors who select the service SMS checkbox on its quote form. Messages support the consultation and project lifecycle: quote request confirmations, consultation and appointment reminders, quotes, installation scheduling, project updates and customer support. Message frequency varies.

**Marketing / promotional campaign:**

> Sky Window Design & More, LLC sends promotional text messages only to website visitors who separately select the promotional SMS checkbox on its quote form. Messages may include special offers, discounts, product announcements and seasonal promotions for custom shades, blinds, shutters and draperies. Message frequency varies.

**Combined (Mixed / Low Volume Mixed campaign):**

> Sky Window Design & More, LLC, a custom window treatment showroom in Orange Beach, Alabama, texts website visitors who opt in on its quote form, which offers two separate optional checkboxes. Visitors who select the service checkbox receive quote confirmations, appointment reminders, installation scheduling, project updates and customer support. Only visitors who also select the promotional checkbox receive special offers, discounts, product announcements and seasonal promotions. Message frequency varies.

## Sample messages

Bracketed values are filled from the recipient's real request or project.

**Service:**

1. `Sky Window Design & More: Hi [First Name], thanks for requesting a window treatment quote. We will call you to set up a convenient consultation time. Reply STOP to opt out or HELP for help.`
2. `Sky Window Design & More: Reminder: your in-home consultation is on [Date] at [Time]. Questions? Call (251) 206-7319. Reply STOP to opt out or HELP for help.`
3. `Sky Window Design & More: Hi [First Name], your [Product] installation is scheduled for [Date]. Reply here or call (251) 206-7319 with any questions. Reply STOP to opt out or HELP for help.`

**Promotional:**

1. `Sky Window Design & More: Hi [First Name], [Offer Description] on custom shades and shutters runs through [Offer End Date]. Reply STOP to opt out or HELP for help.`
2. `Sky Window Design & More: [Product Announcement] is now in our Orange Beach showroom. Call (251) 206-7319 to book a visit. Reply STOP to opt out or HELP for help.`

For a Mixed campaign, submit service samples 1 and 2 and promotional sample 1.

## Keyword replies

- **Opt-out keywords:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- **Opt-out reply:** `Sky Window Design & More: You have been unsubscribed and will receive no further messages.`
- **Help keyword:** HELP
- **Help reply:** `Sky Window Design & More: For help, call (251) 206-7319 or email lance@skywindowdesign.com. Msg & data rates may apply. Reply STOP to opt out.`
- **Opt-in keywords:** none. Opt-in is by website form only.

## Mobile data and consent sharing

Mobile information, SMS opt-in data, phone numbers and consent records are not shared with third parties or affiliates for their marketing or promotional purposes. The customer relationship platform processes records only on Sky Window Design & More's behalf, to deliver the messages the visitor chose. The Privacy Policy states: "Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes."

## Recordkeeping

For every website lead, `netlify/functions/submit-lead.ts` stores on the GoHighLevel contact:

- the tag `sms-transactional-opt-in` and/or `sms-marketing-opt-in` for each box ticked (no tag for an unticked box);
- a note reading `Website form submitted <UTC timestamp> from <page>`, followed by `Service SMS opt-in: Yes/No` and `Promotional SMS opt-in: Yes/No`.

A missing or malformed value is never stored as consent.
