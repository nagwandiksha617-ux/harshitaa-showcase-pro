import { BarChart3, PenLine, Search, Share2 } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { services } from "@/data/portfolio";

const icons = [Search, Share2, PenLine, BarChart3];

export function Services() {
  return (
    <section id="services" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Services"
          title="How I can help right now"
          description="Entry-level support scoped to what I can genuinely deliver today, with clear briefs and realistic timelines."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = icons[i % icons.length]!;
            return (
              <Reveal
                key={service.title}
                delay={i * 80}
                className="card-lift h-full rounded-2xl border border-border bg-card p-6"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
