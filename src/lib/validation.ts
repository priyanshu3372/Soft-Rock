import { z } from "zod";

export const eventTypes = [
  "Private Event",
  "Corporate Event",
  "Wedding or Celebration",
  "College or University Event",
  "Festival",
  "Venue Performance",
  "Other",
] as const;

export const audienceSizes = ["Under 100", "100–300", "300–700", "700–1,500", "1,500+"] as const;

/** Fields the visitor fills in. Shared by the client form and the API route. */
export const bookingSchema = z.object({
  name: z.string().trim().min(2, { error: "Please enter your full name." }).max(100, { error: "That name is a little long." }),
  email: z.email({ error: "Please enter a valid email address." }).trim().max(160),
  phone: z
    .string()
    .trim()
    .max(24)
    .refine((v) => v === "" || /^\+?[\d\s()-]{7,20}$/.test(v), { error: "Please enter a valid phone number, or leave it blank." })
    .default(""),
  eventType: z.enum(eventTypes, { error: "Please choose an event type." }),
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { error: "Please choose your event date." })
    // Compare against "yesterday" in UTC so visitors in time zones behind UTC can still pick their local today.
    .refine((v) => v >= new Date(Date.now() - 864e5).toISOString().slice(0, 10), { error: "The event date can't be in the past." }),
  location: z.string().trim().min(2, { error: "Please tell us where the event is." }).max(160),
  audienceSize: z.union([z.enum(audienceSizes), z.literal("")]).default(""),
  message: z.string().trim().max(2000, { error: "Please keep your message under 2,000 characters." }).default(""),
});

/** Values as entered in the form (optional fields may be omitted). */
export type BookingFormValues = z.input<typeof bookingSchema>;
/** Validated, normalised enquiry. */
export type BookingInput = z.output<typeof bookingSchema>;

/** Spam-protection fields added by the form. Checked on the server only. */
export const bookingRequestSchema = bookingSchema.extend({
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(200).optional().default(""),
  /** Timestamp (ms) when the form was rendered. */
  startedAt: z.number().int().positive(),
});

/** Today's date in the visitor's own time zone, for the date picker's `min`. */
export const minDateForInput = () => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
};
