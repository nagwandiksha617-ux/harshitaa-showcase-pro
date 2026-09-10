import { Search, Target, Share2, Megaphone, PenLine, BarChart3, Globe } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { capabilities } from "@/data/portfolio";

const icons = [Search, Target, Share2, Megaphone, PenLine, BarChart3, Globe];

export function WhatICanDo() {
  return (
    <section id="what-i-can-do" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What I Can Do"
          title="Practical capabilities I can apply"
          description="Seven areas where my training and project experience allow me to support real marketing work today."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, i) => {
            const Icon = icons[i % icons.length]!;
            return (
              <Reveal
                key={capability.title}
                delay={i * 80}
                className="card-lift h-full rounded-2xl border border-border bg-card p-6"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{capability.title}</h3>
                <ul className="mt-3 space-y-2">
                  {capability.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-muted-foreground">
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
