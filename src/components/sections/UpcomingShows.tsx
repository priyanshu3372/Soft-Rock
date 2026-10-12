import { ArrowUpRight } from "lucide-react";
import type { UpcomingShow } from "@/data/events";
import { formatDate } from "@/lib/utils";

/** Renders verified upcoming shows from src/data/events.ts. */
export function UpcomingShowsList({ shows }: { shows: UpcomingShow[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {shows.map((s) => (
        <li key={`${s.date}-${s.title}`} className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr_auto] sm:items-center sm:gap-6">
          <time dateTime={s.date} className="display text-2xl text-gold">
            {formatDate(s.date, { day: "2-digit", month: "short" })}
            <span className="ml-2 font-sans text-xs tracking-[0.2em] text-smoke">{s.date.slice(0, 4)}</span>
          </time>
          <div>
            <p className="font-semibold text-bone">{s.title}</p>
            <p className="text-sm text-ash">
              {s.venue}, {s.city}
              {s.time && ` · ${s.time}`}
              {s.note && ` · ${s.note}`}
            </p>
          </div>
          {s.ticketUrl && (
            <a
              href={s.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-bone"
            >
              Tickets <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">for {s.title} (opens in a new tab)</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
