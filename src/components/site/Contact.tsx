import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal, SectionHeading } from "./Reveal";
import { profile } from "@/data/portfolio";

export function Contact() {
  return (
    <section id="contact" className="hero-dark relative overflow-hidden py-24">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          tone="dark"
          title="Let's connect"
          description="Open to digital marketing roles, internships and freelance website or marketing projects."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-4">
            {profile.email ? (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-white/85 backdrop-blur transition-colors hover:bg-white/10"
              >
                <Mail className="h-5 w-5 text-brand-soft" aria-hidden />
                {profile.email}
              </a>
            ) : (
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-white/20 bg-white/5 p-5 text-sm text-white/60">
                <Mail className="h-5 w-5 text-brand-soft" aria-hidden />
                Email address to be added
              </div>
            )}

            {profile.phone ? (
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-white/85 backdrop-blur transition-colors hover:bg-white/10"
              >
                <Phone className="h-5 w-5 text-brand-soft" aria-hidden />
                {profile.phone}
              </a>
            ) : (
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-white/20 bg-white/5 p-5 text-sm text-white/60">
                <Phone className="h-5 w-5 text-brand-soft" aria-hidden />
                Phone number to be added
              </div>
            )}

            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-white/85 backdrop-blur">
              <MapPin className="h-5 w-5 text-brand-soft" aria-hidden />
              {profile.location}
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {profile.socials.map((s) =>
                s.href ? (
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
                ) : (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-1 rounded-full border border-dashed border-white/20 px-4 py-2 text-sm text-white/50"
                  >
                    {s.label} — link to be added
                  </span>
                ),
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <InquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// Future: set this to a Google Apps Script web app URL to store inquiries in Google Sheets.
const INQUIRY_ENDPOINT = "";

const INTERESTS = [
  "Digital Marketing",
  "SEO",
  "Google Ads",
  "Meta Ads",
  "Social Media Marketing",
  "Website Development",
  "Freelance Project",
  "Job / Internship",
  "Other",
];

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

const inquirySchema = z.object({
  full_name: z.string().trim().min(1, "Please enter your full name").max(100),
  email: z.string().trim().min(1, "Please enter your email address").email("Please enter a valid email address").max(255),
  phone: z.string().trim().max(30).optional(),
  interested_in: z.string().refine((v) => INTERESTS.includes(v), "Please choose an option"),
  details: z.string().trim().min(1, "Please share a few details").max(2000),
});

type Errors = Partial<Record<keyof z.infer<typeof inquirySchema>, string>>;

const fieldClass = "mt-2 border-white/20 bg-white/5 text-white placeholder:text-white/40";

function InquiryForm() {
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);
  const [utm, setUtm] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const values: Record<string, string> = {};
    UTM_KEYS.forEach((k) => (values[k] = params.get(k) ?? ""));
    setUtm(values);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = inquirySchema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof Errors;
        if (!next[k]) next[k] = i.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    setSending(true);
    try {
      const payload = { ...parsed.data, ...utm, submitted_at: new Date().toISOString() };
      if (INQUIRY_ENDPOINT) {
        await fetch(INQUIRY_ENDPOINT, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) });
      }
      form.reset();
      setSuccess(true);
      toast.success("Thank you! Your inquiry has been received. I’ll get back to you soon.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="full_name" label="Full Name *" placeholder="Enter your full name" error={errors.full_name} />
        <Field id="email" label="Email Address *" type="email" placeholder="Enter your email address" error={errors.email} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="phone" label="Phone Number" type="tel" placeholder="Enter your phone number" error={errors.phone} />
        <div>
          <Label htmlFor="interested_in" className="text-white/80">Interested In *</Label>
          <select
            id="interested_in"
            name="interested_in"
            defaultValue=""
            aria-invalid={!!errors.interested_in}
            className={`${fieldClass} flex h-9 w-full rounded-md border px-3 text-sm [&>option]:text-foreground`}
          >
            <option value="" disabled>Select an option</option>
            {INTERESTS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {errors.interested_in && <p className="mt-1 text-xs text-red-300">{errors.interested_in}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="details" className="text-white/80">Project / Inquiry Details *</Label>
        <Textarea
          id="details"
          name="details"
          rows={5}
          aria-invalid={!!errors.details}
          placeholder="Tell me a little about your project, requirement or inquiry..."
          className={fieldClass}
        />
        {errors.details && <p className="mt-1 text-xs text-red-300">{errors.details}</p>}
      </div>
      {UTM_KEYS.map((k) => (
        <input key={k} type="hidden" name={k} value={utm[k] ?? ""} readOnly />
      ))}
      <Button type="submit" size="lg" disabled={sending} className="w-full rounded-full">
        {sending ? "Sending…" : "Send Inquiry"}
      </Button>
      {success && (
        <p role="status" className="text-center text-sm text-brand-soft">
          Thank you! Your inquiry has been received. I’ll get back to you soon.
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-white/80">{label}</Label>
      <Input id={id} name={id} type={type} placeholder={placeholder} aria-invalid={!!error} className={fieldClass} />
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}
