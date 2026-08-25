import { useState } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal, SectionHeading } from "./Reveal";
import { profile } from "@/data/portfolio";

export function Contact() {
  const [sending, setSending] = useState(false);

  return (
    <section id="contact" className="hero-dark relative overflow-hidden py-24">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          tone="dark"
          title="Let's talk about your next project"
          description="Open to entry-level digital marketing roles, internships and small freelance work. I usually reply within a day or two."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-4">
            {/* PLACEHOLDER: replace email, phone and social links in src/data/portfolio.ts */}
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-white/85 backdrop-blur transition-colors hover:bg-white/10"
            >
              <Mail className="h-5 w-5 text-brand-soft" aria-hidden />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-white/85 backdrop-blur transition-colors hover:bg-white/10"
            >
              <Phone className="h-5 w-5 text-brand-soft" aria-hidden />
              {profile.phone}
            </a>
            <div className="flex flex-wrap gap-2 pt-1">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              className="space-y-4 rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur"
              onSubmit={(e) => {
                e.preventDefault();
                setSending(true);
                // PLACEHOLDER: connect this form to email or a backend to receive messages.
                setTimeout(() => {
                  setSending(false);
                  toast.success("Thanks! Message noted — hook this form up to start receiving it.");
                  (e.target as HTMLFormElement).reset();
                }, 600);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Your name" />
                <Field id="email" label="Email" type="email" />
              </div>
              <div>
                <Label htmlFor="message" className="text-white/80">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me a little about the role or project…"
                  className="mt-2 border-white/20 bg-white/5 text-white placeholder:text-white/40"
                />
              </div>
              <Button type="submit" size="lg" disabled={sending} className="w-full rounded-full">
                {sending ? "Sending…" : "Send message"}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <Label htmlFor={id} className="text-white/80">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        required
        className="mt-2 border-white/20 bg-white/5 text-white placeholder:text-white/40"
      />
    </div>
  );
}
