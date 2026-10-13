// SmsConsent.tsx — the optional SMS opt-in block every lead form renders.
// Neither box is checked or required: carriers reject a campaign whose opt-in
// is preselected or blocks the form, and marketing consent has to be its own
// choice. The wording lives in lib/smsConsent.ts.

import { useId } from "react";
import { SMS_DISCLOSURE, SMS_FIELDS, SMS_PROMO_CONSENT, SMS_SERVICE_CONSENT } from "@/lib/smsConsent";

export function SmsConsent({ compact = false, disabled = false }: { compact?: boolean; disabled?: boolean }) {
  const disclosureId = `${useId()}-sms-disclosure`;
  const text = compact ? "text-[12px]" : "text-[13px]";
  const box = "mt-0.5 h-4 w-4 flex-shrink-0 rounded border-slate-300 accent-blue-600";
  const link = "underline underline-offset-2 hover:text-blue-700";

  return (
    <fieldset className={`space-y-2 ${text} leading-relaxed text-slate-600`}>
      <legend className={`${compact ? "text-[12.5px]" : "text-[13.5px]"} font-semibold text-slate-700 mb-1`}>
        SMS updates (optional)
      </legend>
      <label className="flex items-start gap-2.5">
        <input type="checkbox" name={SMS_FIELDS.service} aria-describedby={disclosureId} disabled={disabled} className={box} />
        <span>{SMS_SERVICE_CONSENT}</span>
      </label>
      <label className="flex items-start gap-2.5">
        <input type="checkbox" name={SMS_FIELDS.promo} aria-describedby={disclosureId} disabled={disabled} className={box} />
        <span>{SMS_PROMO_CONSENT}</span>
      </label>
      <p id={disclosureId} className="text-slate-500">{SMS_DISCLOSURE}</p>
      {/* New tab, so following a policy link doesn't throw away a half-filled form. */}
      <p className="text-slate-500">
        <a href="/privacy" target="_blank" rel="noopener" className={link}>Privacy Policy</a>
        {" · "}
        <a href="/terms-of-service" target="_blank" rel="noopener" className={link}>Terms of Service</a>
        {" · "}
        <a href="/sms-consent" target="_blank" rel="noopener" className={link}>SMS details</a>
      </p>
    </fieldset>
  );
}
