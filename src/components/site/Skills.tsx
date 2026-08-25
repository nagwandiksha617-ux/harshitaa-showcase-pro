import { Reveal, SectionHeading } from "./Reveal";
import { skillGroups } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="border-b border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="What I can do today"
          description="Working knowledge built through courses and applied practice — described honestly, without certification claims."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 90}
              className="card-lift rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-4">
                {group.skills.map((s) => (
                  <li key={s.name}>
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{s.note}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
