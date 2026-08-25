import { GraduationCap } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { education } from "@/data/portfolio";

export function Education() {
  return (
    <section id="education" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Education & training"
          title="Digital marketing training and ongoing learning"
          description="Recently completed digital marketing training — certificate pending — with practical learning continuing through live projects."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {education.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 90}
              className="card-lift rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-start gap-3">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.org} · {item.period}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
