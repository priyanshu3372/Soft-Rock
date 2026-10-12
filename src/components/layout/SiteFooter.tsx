import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { bookingHref, navigation, siteConfig } from "@/data/site";
import { InstagramIcon, YouTubeIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";

export function SiteFooter() {
  const { social, contact } = siteConfig;
  return (
    <footer className="relative border-t border-line bg-ink-2">
      <div className="container-x grid gap-14 py-20 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="h-24">
            <Logo href={null} sizes="128px" />
          </div>
          <p className="mt-8 max-w-sm font-serif text-2xl italic leading-snug text-bone/90">
            A Sufi-rock fusion band from Delhi NCR. Soul, rhythm and a stage full of sound.
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href={social.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center border border-line text-bone transition-colors hover:border-gold hover:text-gold"
            >
              <YouTubeIcon className="h-5 w-5" />
              <span className="sr-only">Softrock on YouTube (opens in a new tab)</span>
            </a>
            <a
              href={social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center border border-line text-bone transition-colors hover:border-gold hover:text-gold"
            >
              <InstagramIcon className="h-5 w-5" />
              <span className="sr-only">Softrock on Instagram (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow mb-6 text-smoke">Explore</p>
          <ul className="space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-sm text-ash transition-colors hover:text-bone">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow mb-6 text-smoke">Bookings &amp; enquiries</p>
          <ul className="space-y-4 text-sm">
            <li>
              <a href={`mailto:${contact.email}`} className="group inline-flex items-center gap-3 text-bone hover:text-gold">
                <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
                <span className="link-underline">{contact.email}</span>
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="group inline-flex items-center gap-3 text-bone hover:text-gold">
                <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                <span className="link-underline">{contact.phoneDisplay}</span>
              </a>
            </li>
          </ul>
          <Link
            href={bookingHref}
            className="mt-8 inline-flex min-h-12 items-center border border-gold/70 px-6 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Send a booking enquiry
          </Link>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.</p>
          <p>Official website · {siteConfig.location}</p>
        </div>
      </div>
    </footer>
  );
}
