// ============================================================
// EDIT ME: All portfolio content lives here.
// Placeholders are marked with "REPLACE:" — swap in real values.
// ============================================================

export const profile = {
  name: "Harshitaa Sharma",
  role: "Digital Marketing Professional",
  tagline:
    "Entry-level digital marketer with hands-on project experience and an ongoing internship — focused on SEO, social media and content that is measured, not guessed.",
  location: "REPLACE: City, Country",
  email: "REPLACE: your.email@example.com",
  phone: "REPLACE: +91 00000 00000",
  // REPLACE: drop your photo in src/assets and import it, or paste a URL here.
  photo: "",
  resumeUrl: "#", // REPLACE: link to your resume PDF
  socials: [
    { label: "LinkedIn", href: "#" }, // REPLACE
    { label: "Instagram", href: "#" }, // REPLACE
    { label: "GitHub", href: "#" }, // REPLACE
  ],
};

export const about = {
  intro: [
    "I'm an early-career digital marketing professional building practical skills through self-driven projects and an ongoing internship. I like the parts of marketing where creativity meets measurement — writing copy that sounds human, then checking whether it actually worked.",
    "My focus areas are search visibility, social media content systems, and clear reporting. I'm learning in public: every project below documents what I planned, what I built, and what I'd do differently next time.",
  ],
  highlights: [
    "Hands-on project experience across SEO, social and content",
    "Ongoing digital marketing internship",
    "Comfortable with analytics dashboards and reporting basics",
    "Fast learner, deadline-reliable, collaborative",
  ],
};

export type Skill = { name: string; note: string };
export const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Marketing",
    skills: [
      { name: "SEO fundamentals", note: "On-page, keyword research, audits" },
      { name: "Social media marketing", note: "Content calendars, community" },
      { name: "Content writing", note: "Blogs, captions, ad copy" },
      { name: "Email marketing", note: "Campaign drafting, list basics" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Google Analytics", note: "Traffic & behaviour reports" },
      { name: "Canva", note: "Social creatives, carousels" },
      { name: "Meta Business Suite", note: "Scheduling, page insights" },
      { name: "Google Sheets", note: "Trackers, simple dashboards" },
    ],
  },
  {
    title: "Working style",
    skills: [
      { name: "Research & audits", note: "Competitor and content gaps" },
      { name: "Reporting", note: "Clear, honest weekly summaries" },
      { name: "Collaboration", note: "Briefs, feedback loops" },
      { name: "AI-assisted workflows", note: "Ideation and drafting support" },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  type: string;
  summary: string;
  objective: string;
  approach: string[];
  learnings: string[];
  tools: string[];
  liveUrl?: string; // REPLACE: live link if available
  screenshot?: string; // REPLACE: screenshot URL / import
};

export const projects: Project[] = [
  {
    id: "seo-audit",
    title: "SEO audit for a small local business",
    type: "Practice project",
    summary:
      "A full on-page and technical review of a local service website, delivered as a prioritised action list.",
    objective:
      "Understand how a small site loses search visibility and produce recommendations a non-technical owner could act on.",
    approach: [
      "Crawled key pages and logged title, meta and heading issues",
      "Built a keyword map matched to existing service pages",
      "Reviewed page speed and mobile usability signals",
      "Wrote a prioritised, plain-language recommendation sheet",
    ],
    learnings: [
      "Prioritising by effort-vs-impact matters more than listing every issue",
      "Recommendations only land when written for the client, not for marketers",
    ],
    tools: ["Google Search Console", "Google Analytics", "Sheets"],
  },
  {
    id: "social-calendar",
    title: "30-day social media content system",
    type: "Practice project",
    summary:
      "A repeatable content calendar with pillars, hooks and creative templates for an Instagram-first brand.",
    objective:
      "Move from ad-hoc posting to a structured, reusable monthly content system.",
    approach: [
      "Defined four content pillars from audience research",
      "Drafted 30 captions with hook / value / CTA structure",
      "Designed reusable Canva templates for consistency",
      "Set up a simple tracker for posting and engagement notes",
    ],
    learnings: [
      "A template library removes most of the weekly friction",
      "Consistency of format helps more than chasing every trend",
    ],
    tools: ["Canva", "Meta Business Suite", "Sheets"],
  },
  {
    id: "content-blog",
    title: "Long-form blog & content writing samples",
    type: "Writing portfolio",
    summary:
      "Search-informed articles written to a brief, with structure, internal linking and clear intent matching.",
    objective:
      "Practise writing content that reads well for people and is structured for search.",
    approach: [
      "Chose topics from keyword research and search intent",
      "Outlined with H2/H3 structure before drafting",
      "Edited for readability, scannability and internal links",
    ],
    learnings: [
      "Outlining first cuts drafting time roughly in half",
      "Intent match is the single biggest quality lever",
    ],
    tools: ["Google Docs", "Keyword research tools"],
  },
  {
    id: "internship",
    title: "Ongoing digital marketing internship",
    type: "Internship (in progress)",
    summary:
      "Supporting day-to-day marketing execution: content, scheduling, research and reporting.",
    objective:
      "Apply learning in a live environment and build professional working habits.",
    approach: [
      "Assist with content drafting and scheduling",
      "Support competitor and audience research tasks",
      "Help compile weekly performance summaries",
    ],
    learnings: [
      "Real timelines change how you plan content",
      "Clear internal communication is part of the deliverable",
    ],
    tools: ["Analytics dashboards", "Canva", "Sheets"],
  },
];

export const experience = [
  {
    role: "Digital Marketing Intern",
    org: "REPLACE: Company name",
    period: "Ongoing",
    points: [
      "Supporting content creation, scheduling and basic performance reporting.",
      "Assisting with keyword and competitor research for ongoing campaigns.",
      "Collaborating with the team on briefs, revisions and publishing checklists.",
    ],
  },
  {
    role: "Self-directed marketing projects",
    org: "Independent",
    period: "REPLACE: 20XX — present",
    points: [
      "Built practice projects across SEO, social content and copywriting.",
      "Documented process and takeaways for each project.",
    ],
  },
];

export const education = [
  {
    title: "REPLACE: Degree / Programme",
    org: "REPLACE: Institution",
    period: "REPLACE: 20XX — 20XX",
    note: "REPLACE: brief note on coursework or focus.",
  },
  {
    title: "Self-paced digital marketing learning",
    org: "Online courses & practical study",
    period: "Ongoing",
    note: "Learning through structured courses and applying it in live projects. No certification claimed.",
  },
];

export const services = [
  {
    title: "SEO support",
    body: "On-page reviews, keyword research and content briefs for small sites.",
  },
  {
    title: "Social media content",
    body: "Content calendars, captions and reusable creative templates.",
  },
  {
    title: "Content writing",
    body: "Blogs, landing copy and product descriptions written to a brief.",
  },
  {
    title: "Reporting help",
    body: "Simple, readable weekly or monthly performance summaries.",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
