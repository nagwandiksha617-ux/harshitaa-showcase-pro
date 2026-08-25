import { useState } from "react";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "./Reveal";
import { projects, type Project } from "@/data/portfolio";

export function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Work, process and takeaways"
          description="Practice projects and internship work. Each card opens the brief, the approach and what I learned — no fabricated results."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 80} as="article">
              <button
                type="button"
                onClick={() => setOpenProject(project)}
                className="card-lift group flex h-full w-full flex-col rounded-2xl border border-border bg-card p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`Open details for ${project.title}`}
              >
                <div className="mb-5 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl border border-border bg-gradient-to-br from-surface to-accent/40">
                  {project.screenshot ? (
                    <img
                      src={project.screenshot}
                      alt={`Preview of ${project.title}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span className="flex flex-col items-center gap-2 text-center">
                      <ImageIcon className="h-6 w-6 text-primary/50" aria-hidden />
                      <span className="text-xs font-medium tracking-wide text-muted-foreground">
                        Visuals coming soon
                      </span>
                    </span>
                  )}
                </div>


                <Badge variant="secondary" className="w-fit rounded-full text-xs font-medium">
                  {project.type}
                </Badge>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  View details
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={!!openProject} onOpenChange={(o) => !o && setOpenProject(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {openProject ? (
            <>
              <DialogHeader>
                <Badge variant="secondary" className="w-fit rounded-full text-xs">
                  {openProject.type}
                </Badge>
                <DialogTitle className="text-xl">{openProject.title}</DialogTitle>
                <DialogDescription>{openProject.summary}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-2">
                <Block title="Objective">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {openProject.objective}
                  </p>
                </Block>
                <Block title="Approach">
                  <ul className="space-y-2">
                    {openProject.approach.map((a) => (
                      <li key={a} className="flex gap-2.5 text-sm text-muted-foreground">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </Block>
                <Block title="What I learned">
                  <ul className="space-y-2">
                    {openProject.learnings.map((l) => (
                      <li key={l} className="flex gap-2.5 text-sm text-muted-foreground">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </Block>
                <Block title="Tools used">
                  <div className="flex flex-wrap gap-2">
                    {openProject.tools.map((t) => (
                      <Badge key={t} variant="outline" className="rounded-full font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </Block>

                <div className="rounded-xl border border-dashed border-border bg-surface p-4 text-xs text-muted-foreground">
                  {openProject.liveUrl ? (
                    <Button asChild size="sm" className="rounded-full">
                      <a href={openProject.liveUrl} target="_blank" rel="noreferrer">
                        Open live project
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <>
                      PLACEHOLDER: add a live URL and screenshots for this project in{" "}
                      <code>src/data/portfolio.ts</code>.
                    </>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{title}</h4>
      <div className="mt-3">{children}</div>
    </div>
  );
}
