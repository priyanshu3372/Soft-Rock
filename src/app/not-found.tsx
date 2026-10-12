import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_60%_at_50%_0%,rgb(233_197_143/0.18),transparent_70%)]"
      />
      <div className="container-x pt-24 text-center">
        <p className="eyebrow mb-6">404 · Off the setlist</p>
        <h1 className="display text-[clamp(3rem,12vw,9rem)]">
          This page <span className="accent">missed</span> its cue.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-ash">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/music" variant="ghost">
            Watch the music
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
