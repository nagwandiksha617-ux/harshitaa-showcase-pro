import { ArrowDown, ArrowUpRight, Camera, Mail, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="top" className="hero-dark relative overflow-hidden">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-28 pt-32 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pb-36 lg:pt-40">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand-soft" />
            Open to entry-level roles & freelance projects
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            {profile.name}
            <span className="mt-2 block text-gradient">{profile.role}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <a href="#projects">
                View my work
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#contact">
                <Mail className="mr-1 h-4 w-4" />
                Get in touch
              </a>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {[
              { k: "Focus", v: "SEO · Social · Content" },
              { k: "Status", v: "Internship ongoing" },
              { k: "Based in", v: profile.location },
            ].map((item) => (
              <div key={item.k}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  {item.k}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-white/90">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand/25 to-accent2/25 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/5 p-3 backdrop-blur">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-white/10 to-white/0">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={`${profile.name}, ${profile.role}`}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              ) : (
                <div
                  className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center"
                  aria-label="Professional photo placeholder"
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/5 shadow-[0_0_40px_-12px_oklch(0.6_0.14_205/0.35)] backdrop-blur-sm">
                    <Camera className="h-9 w-9 text-white/50" />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                    Professional photo
                  </p>
                </div>
              )}
            </div>
            <p className="flex items-center justify-center gap-1.5 py-3 text-xs text-white/60">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </p>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="relative mx-auto mb-8 hidden w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white sm:flex"
      >
        Scroll <ArrowDown className="h-3.5 w-3.5" />
      </a>
    </section>
  );
}
