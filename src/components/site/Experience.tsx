import { Reveal, SectionHeading } from "./Reveal";
import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="border-b border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I'm learning and contributing"
          description="An ongoing 3-month digital marketing internship at Briwon Academy, Jaipur, alongside personal and client project work."
        />

        <div className="mt-12 max-w-3xl">
          <ol className="space-y-8 border-l border-border pl-6">
            {experience.map((item, i) => (
              <Reveal key={item.role} delay={i * 90} as="li" className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[1.9rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-surface"
                />
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {item.period}
                </p>
                <h3 className="mt-1 text-base font-semibold text-foreground">{item.role}</h3>
                <p className="text-sm text-muted-foreground">{item.org}</p>
                <ul className="mt-3 space-y-1.5">
                  {item.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-muted-foreground">
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
