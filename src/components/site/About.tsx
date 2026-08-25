import { Check } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { about, profile } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="About"
          title="Practical Digital Marketing Professional"
          description="Practical learning, continuous improvement and using the right digital tools to create useful marketing solutions."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="space-y-5">
            {about.intro.map((p) => (
              <p key={p} className="text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            <p className="text-sm text-muted-foreground">
              Based in {profile.location}. Open to entry-level roles, internships and freelance
              website or marketing projects.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="space-y-3 rounded-2xl border border-border bg-surface p-6">
              {about.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
