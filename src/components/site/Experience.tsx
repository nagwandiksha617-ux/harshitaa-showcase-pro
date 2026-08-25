import { GraduationCap } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { education, experience } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="border-b border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience & education"
          title="Where I'm learning and contributing"
          description="An ongoing internship plus self-directed project work. Company and programme details are placeholders until filled in."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Experience
            </h3>
            <ol className="mt-6 space-y-6 border-l border-border pl-6">
              {experience.map((item, i) => (
                <Reveal key={item.role} delay={i * 90} as="li" className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[1.9rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-surface"
                  />
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {item.period}
                  </p>
                  <h4 className="mt-1 text-base font-semibold text-foreground">{item.role}</h4>
                  <p className="text-sm text-muted-foreground">{item.org}</p>
                  <ul className="mt-3 space-y-1.5">
                    {item.points.map((p) => (
                      <li key={p} className="text-sm leading-relaxed text-muted-foreground">
                        — {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Education & learning
            </h3>
            <div className="mt-6 space-y-4">
              {education.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={i * 90}
                  className="card-lift rounded-2xl border border-border bg-card p-6"
                >
                  <div className="flex items-start gap-3">
                    <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <div>
                      <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.org} · {item.period}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.note}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
