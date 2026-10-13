// The SMS opt-in wording, in one place. The forms render it, the /sms-consent
// page quotes it to A2P reviewers, and docs/a2p-campaign-package.md repeats it
// for the campaign registration, so all three must say the same thing. Change
// the wording here and update that document in the same commit.
//
// Patterned on shenandoahshutters.com, whose campaign was approved with this
// structure: two separate, unchecked, optional checkboxes (service and
// promotional), the sender's legal name in each, and one shared disclosure
// with frequency, rates, STOP, HELP and "not a condition of purchase".
import { CONTACT } from "./siteData";

export const SMS_SENDER = CONTACT.legalName;

export const SMS_SERVICE_CONSENT = `I agree to receive service texts from ${SMS_SENDER} about consultations, appointments, quotes, installations, and customer support.`;

export const SMS_PROMO_CONSENT = `I agree to receive promotional texts from ${SMS_SENDER} about offers and product news.`;

export const SMS_DISCLOSURE =
  "For either option: Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase.";

export const SMS_FIELDS = { service: "sms_transactional", promo: "sms_marketing" } as const;

// Unchecked boxes are absent from FormData, so only a box the visitor ticked
// reads as consent.
export function smsChoices(fd: FormData) {
  return {
    smsTransactionalOptIn: fd.get(SMS_FIELDS.service) === "on",
    smsMarketingOptIn: fd.get(SMS_FIELDS.promo) === "on",
  };
}
