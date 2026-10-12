import "server-only";
import type { BookingInput } from "./validation";

/**
 * Delivers a booking enquiry to whichever channels are configured.
 *
 *  - Email via Resend:  RESEND_API_KEY + BOOKING_TO_EMAIL (+ optional BOOKING_FROM_EMAIL)
 *  - Generic webhook:   BOOKING_WEBHOOK_URL (Zapier, Make, Slack, Formspree, a Google Apps Script, …)
 *
 * See README → "Booking form" for setup.
 */

export type DeliveryResult =
  | { status: "delivered"; channels: string[] }
  | { status: "not-configured" }
  | { status: "failed"; errors: string[] };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function formatEnquiry(data: BookingInput) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "-"],
    ["Event type", data.eventType],
    ["Event date", data.eventDate],
    ["Location", data.location],
    ["Audience size", data.audienceSize || "-"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${data.message || "-"}`;
  const html = `<h2 style="font-family:sans-serif">New booking enquiry</h2>
<table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join("")}</table>
<p style="font-family:sans-serif;color:#666;margin-top:24px">Message</p>
<p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(data.message || "-")}</p>`;
  const subject = `Booking enquiry: ${data.eventType}, ${data.eventDate} (${data.name})`.replace(/[\r\n]+/g, " ");
  return { subject, text, html };
}

export async function deliverEnquiry(data: BookingInput): Promise<DeliveryResult> {
  const { RESEND_API_KEY, BOOKING_TO_EMAIL, BOOKING_FROM_EMAIL, BOOKING_WEBHOOK_URL } = process.env;
  const tasks: { channel: string; run: () => Promise<Response> }[] = [];
  const { subject, text, html } = formatEnquiry(data);

  if (RESEND_API_KEY && BOOKING_TO_EMAIL) {
    tasks.push({
      channel: "email",
      run: () =>
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: BOOKING_FROM_EMAIL || "Softrock Website <onboarding@resend.dev>",
            to: BOOKING_TO_EMAIL.split(",").map((s) => s.trim()),
            reply_to: data.email,
            subject,
            text,
            html,
          }),
        }),
    });
  }

  if (BOOKING_WEBHOOK_URL) {
    tasks.push({
      channel: "webhook",
      run: () =>
        fetch(BOOKING_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "booking_enquiry", subject, text, submittedAt: new Date().toISOString(), ...data }),
        }),
    });
  }

  if (tasks.length === 0) return { status: "not-configured" };

  const results = await Promise.allSettled(
    tasks.map(async (t) => {
      const res = await t.run();
      if (!res.ok) throw new Error(`${t.channel} responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
      return t.channel;
    }),
  );

  const delivered = results.flatMap((r) => (r.status === "fulfilled" ? [r.value] : []));
  const errors = results.flatMap((r) => (r.status === "rejected" ? [String(r.reason)] : []));
  errors.forEach((e) => console.error("[booking] delivery error:", e));

  // At least one channel accepted the enquiry, so it is not lost.
  return delivered.length > 0 ? { status: "delivered", channels: delivered } : { status: "failed", errors };
}
