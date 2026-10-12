import Image from "next/image";
import { bookingHref } from "@/data/site";
import { atmosphere } from "@/data/gallery";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function BookingCTA({
  title = (
    <>
      Let&apos;s make it a night to <span className="accent">remember.</span>
    </>
  ),
  text = "Planning an event, celebration, or live music experience? Let's talk.",
}: {
  title?: React.ReactNode;
  text?: string;
}) {
  const bg = atmosphere.nightBokeh;

  return (
    <section aria-labelledby="booking-cta-title" className="relative isolate overflow-hidden py-32 sm:py-44">
      <Image src={bg.src} alt="" fill sizes="100vw" quality={60} className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/60" />
      {/* Spotlight */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_70%_at_50%_0%,rgb(233_197_143/0.28),transparent_70%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink to-transparent" />

      <div className="container-x text-center">
        <Reveal>
          <p className="eyebrow mb-6">Bookings</p>
          <h2 id="booking-cta-title" className="display mx-auto max-w-5xl text-balance text-[clamp(2.8rem,8vw,7.5rem)]">
            {title}
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-bone/80">{text}</p>
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={bookingHref}>Book Softrock</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Get in touch
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
