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

// Google Apps Script Web App that saves inquiries to the connected Google Sheet.
const INQUIRY_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbySxK9gB425pfdElKA9DC5R2Ap9GHGCP5b7xIz4lTHtNvI8FIhs1NsOicag3sHoy2cD/exec";

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
const UTM_MAX_LENGTH = 300;

// Reads the five UTM values from the current page URL. Looks at the query
// string and at any query string inside the hash, matches parameter names
// case-insensitively, and leaves a blank value when a parameter is absent.
function readUtmParams(): Record<string, string> {
  const sources = [new URLSearchParams(window.location.search)];
  const hashQuery = window.location.hash.indexOf("?");
  if (hashQuery >= 0) sources.push(new URLSearchParams(window.location.hash.slice(hashQuery + 1)));

  const found = new Map<string, string>();
  sources.forEach((params) =>
    params.forEach((value, key) => {
      const name = key.toLowerCase();
      if ((UTM_KEYS as readonly string[]).includes(name) && !found.has(name)) found.set(name, value);
    }),
  );

  const values: Record<string, string> = {};
  UTM_KEYS.forEach((k) => (values[k] = (found.get(k) ?? "").trim().slice(0, UTM_MAX_LENGTH)));
  return values;
}

// Keeps the values captured when the page opened, upgraded by any fresh
// non-empty values present in the URL at submit time.
function mergeUtm(captured: Record<string, string>, fresh: Record<string, string>) {
  const merged = { ...captured };
  UTM_KEYS.forEach((k) => {
    if (fresh[k]) merged[k] = fresh[k];
  });
  return merged;
}

// Remembers UTM values for the visit so they survive in-page navigation or a
// URL that loses its query string before the visitor submits the form.
const UTM_STORAGE_KEY = "inquiry_utm";
function loadStoredUtm(): Record<string, string> {
  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}
function storeUtm(values: Record<string, string>) {
  try {
    if (UTM_KEYS.some((k) => values[k])) window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(values));
  } catch {
    /* storage unavailable */
  }
}

// Same values under the common naming styles a Sheet script may read
// (utm_source, utmSource, "UTM Source").
function utmAliases(values: Record<string, string>) {
  const out: Record<string, string> = {};
  UTM_KEYS.forEach((k) => {
    const part = k.slice(4);
    const v = values[k] ?? "";
    out[k] = v;
    out[`utm${part[0].toUpperCase()}${part.slice(1)}`] = v;
    out[`UTM ${part[0].toUpperCase()}${part.slice(1)}`] = v;
  });
  return out;
}

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
    const captured = mergeUtm(mergeUtm(readUtmParams(), loadStoredUtm()), readUtmParams());
    storeUtm(captured);
    setUtm(captured);
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
      const utmValues = mergeUtm(mergeUtm(utm, loadStoredUtm()), readUtmParams());
      const payload = {
        fullName: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? "",
        interestedIn: parsed.data.interested_in,
        inquiryDetails: parsed.data.details,
        ...utmAliases(utmValues),
        submitted_at: new Date().toISOString(),
      };
      // UTM values also go in the endpoint's query string so scripts reading
      // e.parameter receive them as well as scripts parsing the JSON body.
      const url = new URL(INQUIRY_ENDPOINT);
      UTM_KEYS.forEach((k) => url.searchParams.set(k, utmValues[k] ?? ""));
      await fetch(url.toString(), { method: "POST", mode: "no-cors", body: JSON.stringify(payload) });
      form.reset();
      setSuccess(true);
      toast.success("Thank you! Your inquiry has been submitted successfully. I’ll get back to you soon.");
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
          Thank you! Your inquiry has been submitted successfully. I’ll get back to you soon.
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
  error?: string | undefined;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-white/80">{label}</Label>
      <Input id={id} name={id} type={type} placeholder={placeholder} aria-invalid={!!error} className={fieldClass} />
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}
