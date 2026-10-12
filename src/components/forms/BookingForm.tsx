"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { siteConfig } from "@/data/site";
import { audienceSizes, type BookingFormValues, type BookingInput, bookingSchema, eventTypes, minDateForInput } from "@/lib/validation";
import type { BookingResponse } from "@/app/api/booking/route";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "success"; mode: "delivered" | "development" }
  | { kind: "error"; message: string };

const errorMessages: Record<string, string> = {
  rate_limited: "You've sent several enquiries in a short time. Please wait a few minutes and try again.",
  not_configured: "Online booking isn't connected yet, so your enquiry was not sent.",
  delivery_failed: "We couldn't deliver your enquiry just now. Nothing was sent.",
  invalid: "Some details need another look. Please check the highlighted fields.",
  network: "We couldn't reach the server. Please check your connection and try again.",
};

export function BookingForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [minDate, setMinDate] = useState<string>();
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues, unknown, BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: "", email: "", phone: "", eventDate: "", location: "", audienceSize: "", message: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    startedAt.current = Date.now();
    setMinDate(minDateForInput());
  }, []);

  // Move focus to the outcome and bring it into view. The form collapses on
  // success, so the browser's default focus scrolling isn't enough.
  useEffect(() => {
    const el = statusRef.current;
    if (status.kind === "idle" || !el) return;
    el.focus({ preventScroll: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
  }, [status]);

  const onSubmit = handleSubmit(async (values) => {
    setStatus({ kind: "idle" });
    const honeypot = (document.getElementById("booking-website") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => null)) as BookingResponse | null;

      if (data?.ok) {
        setStatus({ kind: "success", mode: data.mode });
        reset();
        return;
      }
      if (data && !data.ok && data.fields) {
        for (const [field, message] of Object.entries(data.fields)) {
          if (field in values) setError(field as keyof BookingFormValues, { message });
        }
      }
      setStatus({ kind: "error", message: errorMessages[data && !data.ok ? data.error : "delivery_failed"] });
    } catch {
      setStatus({ kind: "error", message: errorMessages.network });
    }
  });

  if (status.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-gold/40 bg-ink-2 p-8 outline-none sm:p-12">
        <CircleCheck className="h-10 w-10 text-gold" aria-hidden="true" />
        <h3 className="display mt-6 text-4xl sm:text-5xl">Thank you. Your enquiry is in.</h3>
        {status.mode === "development" ? (
          <p className="mt-4 border-l-2 border-gold pl-4 text-sm leading-relaxed text-gold-soft">
            <strong>Development mode:</strong> no delivery channel is configured, so this enquiry was logged to the server
            console and was <strong>not</strong> sent to the band. See README → &ldquo;Booking form&rdquo; to connect email or a
            webhook.
          </p>
        ) : (
          <p className="mt-4 max-w-lg leading-relaxed text-ash">
            The band will be in touch soon to talk about your event. For anything urgent, email{" "}
            <a className="text-bone underline underline-offset-4 hover:text-gold" href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            .
          </p>
        )}
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className={buttonClasses("ghost", "mt-8")}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby="booking-required-note" className="relative">
      <p id="booking-required-note" className="mb-8 text-sm text-ash">
        Fields marked <span className="text-gold">*</span> are required.
      </p>

      <div className="grid gap-x-6 gap-y-7 md:grid-cols-2">
        <Field label="Full name" required error={errors.name}>
          {(p) => <input {...p} {...register("name")} type="text" autoComplete="name" />}
        </Field>
        <Field label="Email address" required error={errors.email}>
          {(p) => <input {...p} {...register("email")} type="email" autoComplete="email" inputMode="email" />}
        </Field>
        <Field label="Phone number" hint="Optional" error={errors.phone}>
          {(p) => <input {...p} {...register("phone")} type="tel" autoComplete="tel" inputMode="tel" />}
        </Field>
        <Field label="Event type" required error={errors.eventType}>
          {(p) => (
            <select {...p} {...register("eventType")} defaultValue="">
              <option value="" disabled>
                Choose an event type
              </option>
              {eventTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Event date" required error={errors.eventDate}>
          {(p) => <input {...p} {...register("eventDate")} type="date" min={minDate} className={cn(p.className, "[color-scheme:dark]")} />}
        </Field>
        <Field label="Event location" required hint="Venue and city" error={errors.location}>
          {(p) => <input {...p} {...register("location")} type="text" autoComplete="address-level2" />}
        </Field>
        <Field label="Estimated audience size" hint="Optional" error={errors.audienceSize}>
          {(p) => (
            <select {...p} {...register("audienceSize")}>
              <option value="">Not sure yet</option>
              {audienceSizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          )}
        </Field>
        <div className="md:col-span-2">
          <Field label="Tell us about your event" hint="Optional" error={errors.message}>
            {(p) => (
              <textarea
                {...p}
                {...register("message")}
                rows={5}
                placeholder="The occasion, the vibe you're after, timings, any songs you'd love to hear…"
                className={cn(p.className, "min-h-36 resize-y py-4")}
              />
            )}
          </Field>
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="booking-website">Website</label>
        <input id="booking-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="outline-none">
        {status.kind === "error" && (
          <div role="alert" className="mt-8 flex gap-3 border border-[#ff8a7a]/40 bg-[#ff8a7a]/5 p-5 text-sm leading-relaxed">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8a7a]" aria-hidden="true" />
            <p className="text-bone">
              {status.message} You can also reach Softrock directly at{" "}
              <a className="underline underline-offset-4 hover:text-gold" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>{" "}
              or{" "}
              <a className="underline underline-offset-4 hover:text-gold" href={siteConfig.contact.phoneHref}>
                {siteConfig.contact.phoneDisplay}
              </a>
              .
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={isSubmitting} className={buttonClasses("primary", "w-full sm:w-auto sm:min-w-64")}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Send booking enquiry"
          )}
        </button>
        <p className="text-xs leading-relaxed text-smoke sm:max-w-xs sm:text-right">
          Your details are used only to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: FieldError;
  children: (props: { id: string; className: string; "aria-invalid"?: boolean; "aria-describedby"?: string; "aria-required"?: boolean }) => ReactNode;
}

function Field({ label, required, hint, error, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-bone">
          {label}
          {required && (
            <span className="ml-1 text-gold" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {hint && (
          <span id={hintId} className="text-xs text-smoke">
            {hint}
          </span>
        )}
      </div>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        "aria-required": required || undefined,
        className: cn(
          "block min-h-13 w-full border bg-ink-3 px-4 text-base text-bone placeholder:text-smoke transition-colors duration-300 focus:outline-none focus:border-gold focus:bg-ink-2 focus:ring-1 focus:ring-gold",
          error ? "border-[#ff8a7a]" : "border-line hover:border-bone/30",
        ),
      })}
      {error?.message && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-sm text-[#ff8a7a]">
          <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error.message}
        </p>
      )}
    </div>
  );
}
