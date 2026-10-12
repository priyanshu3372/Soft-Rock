import { NextResponse } from "next/server";
import { bookingRequestSchema } from "@/lib/validation";
import { deliverEnquiry } from "@/lib/booking-delivery";

export const runtime = "nodejs";

const MIN_FILL_MS = 3000; // humans take longer than this to fill the form
const MAX_BODY_BYTES = 16_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/**
 * Best-effort in-memory rate limit. On serverless platforms each instance has
 * its own memory, so treat this as a speed bump, not a guarantee.
 */
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export type BookingResponse =
  | { ok: true; mode: "delivered" | "development" }
  | { ok: false; error: "invalid" | "rate_limited" | "not_configured" | "delivery_failed"; fields?: Record<string, string> };

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json<BookingResponse>({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json<BookingResponse>({ ok: false, error: "invalid" }, { status: 413 });
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) throw new Error("too large");
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json<BookingResponse>({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = bookingRequestSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fields[key] ??= issue.message;
    }
    return NextResponse.json<BookingResponse>({ ok: false, error: "invalid", fields }, { status: 400 });
  }

  const { website, startedAt, ...enquiry } = parsed.data;

  // Spam: honeypot filled or submitted implausibly fast. Respond as if accepted
  // so bots learn nothing, but deliver nothing. Real visitors never hit this.
  if (website || Date.now() - startedAt < MIN_FILL_MS) {
    console.warn("[booking] dropped probable spam from", ip);
    return NextResponse.json<BookingResponse>({ ok: true, mode: "delivered" });
  }

  const result = await deliverEnquiry(enquiry);

  if (result.status === "delivered") {
    return NextResponse.json<BookingResponse>({ ok: true, mode: "delivered" });
  }

  if (result.status === "not-configured") {
    if (process.env.NODE_ENV !== "production") {
      // Development fallback: log the enquiry so the full flow can be tested
      // locally. The UI tells the tester it was NOT sent to the band.
      console.info("\n[booking] DEV MODE: no delivery channel configured. Enquiry received:\n", enquiry, "\n");
      return NextResponse.json<BookingResponse>({ ok: true, mode: "development" });
    }
    console.error("[booking] No delivery channel configured in production. Set RESEND_API_KEY + BOOKING_TO_EMAIL or BOOKING_WEBHOOK_URL.");
    return NextResponse.json<BookingResponse>({ ok: false, error: "not_configured" }, { status: 503 });
  }

  return NextResponse.json<BookingResponse>({ ok: false, error: "delivery_failed" }, { status: 502 });
}
