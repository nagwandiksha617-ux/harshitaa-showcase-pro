// ============================================================
// All portfolio content lives here. Items marked EDITABLE are
// intentional placeholders to be filled in later.
// ============================================================

import harshitaaPhoto from "@/assets/harshitaa-sharma-photo.png.asset.json";

import meraSaubhagyaScreenshot from "@/assets/mera-saubhagya-screenshot.png.asset.json";
import naturopathyScreenshot from "@/assets/naturopathy-screenshot.png.asset.json";

export const profile = {
  name: "Harshitaa Sharma",
  role: "Digital Marketing Professional",
  tagline:
    "Entry-level digital marketing professional with practical experience in website development, SEO, Google Ads, Meta Ads, social media marketing, content creation, analytics and AI-assisted marketing workflows.",
  location: "Jaipur, Rajasthan, India",
  email: "", // EDITABLE: add email address
  phone: "", // EDITABLE: add phone number
  photo: harshitaaPhoto.url, // EDITABLE: replace with different photo if needed
  resumeUrl: "/api/public/resume",
  socials: [
    { label: "LinkedIn", href: "" }, // EDITABLE
    { label: "Instagram", href: "" }, // EDITABLE
  ],
};

export const about = {
  intro: [
    "I am an entry-level digital marketing professional with practical experience in website development, SEO, Google Ads, Meta Ads, social media marketing, content creation, Google Analytics, Google Tag Manager and AI-assisted marketing workflows.",
    "I recently completed digital marketing training and am continuing to build my practical experience through real projects and an ongoing 3-month digital marketing internship at Briwon Academy, Jaipur.",
    "I believe in practical learning, continuous improvement and using the right digital tools to create useful marketing solutions.",
  ],
  highlights: [
    "Practical project experience in website development and digital marketing",
    "Ongoing 3-month digital marketing internship at Briwon Academy, Jaipur",
    "Hands-on practice with Google Ads, Google Analytics and Google Tag Manager",
    "Comfortable using AI-assisted tools within marketing workflows",
    "Based in Jaipur, Rajasthan, India",
  ],
};

export type Skill = { name: string; note: string };
export const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Digital marketing",
    skills: [
      { name: "SEO", note: "On-page and SEO-friendly website elements" },
      { name: "Google Ads", note: "Campaign setup practice" },
      { name: "Meta Ads", note: "Practising ad setup and structure" },
      { name: "Social media marketing", note: "Content planning and posting" },
      { name: "Content creation", note: "Website and social content" },
    ],
  },
  {
    title: "Analytics & tracking",
    skills: [
      { name: "Google Analytics", note: "Traffic and behaviour reports" },
      { name: "Google Tag Manager", note: "Tag and tracking implementation" },
      { name: "Website tracking", note: "Basic measurement setup" },
      { name: "Reporting", note: "Simple, factual summaries" },
    ],
  },
  {
    title: "Website & tools",
    skills: [
      { name: "Website development", note: "Structure, content and pages" },
      { name: "Lovable", note: "AI-assisted website building" },
      { name: "WordPress", note: "Website editing and content updates" },
      { name: "Canva", note: "Creatives and social graphics" },
      { name: "AI tools", note: "Ideation, drafting and workflow support" },
    ],
  },
];

export type Capability = { title: string; points: string[] };
export const capabilities: Capability[] = [
  {
    title: "SEO",
    points: [
      "On-page SEO and keyword-friendly content",
      "SEO-friendly website structure and meta elements",
      "Basic technical SEO checks such as headings, URLs and alt text",
      "Applied through the Mera Saubhagya project and internship tasks",
    ],
  },
  {
    title: "Google Ads",
    points: [
      "Search campaign setup practice",
      "Keyword and ad group organisation",
      "Basic bidding and budget awareness",
      "Tracking setup with Google Tag Manager and Google Analytics",
    ],
  },
  {
    title: "Meta Ads",
    points: [
      "Ad campaign structure practice",
      "Audience targeting fundamentals",
      "Creative and copy coordination",
      "Supporting campaign tasks during my internship",
    ],
  },
  {
    title: "Social Media Marketing",
    points: [
      "Content planning and scheduling",
      "Caption writing for social posts",
      "Basic community engagement",
      "Maintaining a consistent brand voice across platforms",
    ],
  },
  {
    title: "Content Creation",
    points: [
      "Website copy and page content",
      "Social media captions and creatives using Canva",
      "Blog and post ideation with drafting support",
      "AI-assisted drafting and editing within workflows",
    ],
  },
  {
    title: "Analytics & Tracking",
    points: [
      "Google Analytics traffic and behaviour reports",
      "Google Tag Manager tag implementation",
      "Basic website event tracking setup",
      "Simple, factual reporting for stakeholders",
    ],
  },
  {
    title: "Website Development",
    points: [
      "Simple, structured websites using Lovable and AI-assisted tools",
      "WordPress content and page editing",
      "Organising content, navigation and user flow",
      "Responsive, SEO-friendly page structure",
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
  tools: string[];
  note?: string;
  liveUrl?: string; // EDITABLE: add live URL when available
  screenshot?: string; // EDITABLE: add screenshot when available
};

export const projects: Project[] = [
  {
    id: "mera-saubhagya",
    title: "Mera Saubhagya — Clothing Brand Website Project",
    type: "Personal practical project",
    summary:
      "A self-initiated website project for a women’s ethnic wear clothing brand, focused on building a professional online presence.",
    objective:
      "Create a professional website and online presence for a women's ethnic wear brand.",
    approach: [
      "Planned the website structure",
      "Developed the website",
      "Organised content and product categories",
      "Worked on SEO-friendly elements",
      "Applied digital marketing concepts",
    ],
    tools: ["Lovable", "AI tools", "SEO", "Content creation", "Website development"],
    liveUrl: "https://lovable.dev/preview/xURrP1yZMBeFBo6NExWl16MDcqHf7GA1",
    screenshot: meraSaubhagyaScreenshot.url,
  },
  {
    id: "naturopathy-website",
    title: "Naturopathy Website — Client Project",
    type: "Client website project",
    summary:
      "A professional, user-friendly website for a naturopathy and healthcare client, reviewed and approved by the client.",
    objective:
      "Create a professional and user-friendly website for a naturopathy/healthcare client.",
    approach: [
      "Planned the website structure",
      "Developed the website using Lovable",
      "Organised content and sections",
      "Worked on UI and UX",
      "Used AI-assisted website development",
    ],
    tools: ["Lovable", "AI tools", "Website development", "UI/UX", "Content structure"],
    liveUrl: "https://lovable.dev/preview/vdWUbVAR3OE2Y8ZpQc25F4HJU4VMmA3R",
    screenshot: naturopathyScreenshot.url,
  },
  {
    id: "ads-analytics-practice",
    title: "Personal Digital Marketing Project",
    type: "Practical digital marketing project",
    summary:
      "Hands-on practice with digital advertising, website tracking and analytics setup.",
    objective:
      "Gain hands-on experience in digital advertising, website tracking and analytics.",
    approach: [
      "Practised Google Ads campaign setup",
      "Implemented Google Tag Manager",
      "Worked with Google Analytics",
      "Set up website tracking",
      "Practised basic measurement and reporting",
    ],
    tools: ["Google Ads", "Google Tag Manager", "Google Analytics"],
    note: "Practice project — screenshots and case study to be added.",
  },
  {
    id: "briwon-internship",
    title: "Digital Marketing Internship — Briwon Academy",
    type: "Internship — ongoing",
    summary:
      "Ongoing 3-month internship applying training across marketing, analytics and website work.",
    objective: "Gain practical experience and apply training skills.",
    approach: [
      "Practising and supporting SEO and content creation",
      "Working on Google Ads and Meta Ads tasks",
      "Supporting social media marketing activities",
      "Working with Google Analytics and Google Tag Manager",
      "Assisting with website development and AI-assisted marketing workflows",
    ],
    tools: [
      "SEO",
      "Google Ads",
      "Meta Ads",
      "Google Analytics",
      "Google Tag Manager",
      "WordPress",
      "Lovable",
      "Canva",
      "AI tools",
    ],
    note: "Ongoing 3-month internship — screenshots can be added later.",
  },
];

export const experience = [
  {
    role: "Digital Marketing Intern",
    org: "Briwon Academy, Jaipur",
    period: "Ongoing · 3-month internship",
    points: [
      "Practising and supporting SEO, content creation and social media marketing.",
      "Working on Google Ads and Meta Ads tasks alongside the team.",
      "Using Google Analytics and Google Tag Manager for tracking and reporting.",
      "Supporting website development and AI-assisted marketing workflows.",
    ],
  },
  {
    role: "Practical Digital Marketing Experience",
    org: "Independent · personal and client projects",
    period: "Practical project work",
    points: [
      "Built and organised websites for a women’s ethnic wear brand and a naturopathy client.",
      "Practised Google Ads, Google Tag Manager and Google Analytics setup.",
      "Applied SEO, content creation and digital marketing concepts through practical projects.",
    ],
  },
];

export const education = [
  {
    title: "Master of Arts (M.A.) in English",
    org: "Pandit Deendayal Upadhyaya Shekhawati University, Sikar; Ginnidevi Satyanarayan Sheksaria Girls P.G. College, Chirawa",
    period: "Completed in 2019",
    note: "Formal postgraduate degree in English literature.",
  },
  {
    title: "Bachelor of Arts (B.A.)",
    org: "University of Rajasthan, Jaipur; G.S.S.N. Girls College, Chirawa (Jhunjhunu)",
    period: "Completed in 2017",
    note: "Formal undergraduate degree in arts.",
  },
  {
    title: "Digital Marketing Training",
    org: "Briwon Academy, Jaipur",
    period: "Recently completed · certificate pending",
    note: "Training covered SEO, Google Ads, Meta Ads, social media marketing, content creation, Google Analytics, Google Tag Manager, website development and AI-assisted marketing workflows.",
  },
  {
    title: "Ongoing practical learning",
    org: "Self-directed practice and live projects",
    period: "Ongoing",
    note: "Continuing to build practical experience through real projects and the ongoing internship.",
  },
];

export const services = [
  {
    title: "Website development",
    body: "Simple, well-structured websites built with AI-assisted tools such as Lovable and WordPress.",
  },
  {
    title: "SEO support",
    body: "On-page basics, SEO-friendly page structure and content organisation for small websites.",
  },
  {
    title: "Social media & content",
    body: "Content planning, captions and creatives for social media pages.",
  },
  {
    title: "Analytics & tracking setup",
    body: "Google Analytics and Google Tag Manager setup with basic, factual reporting.",
  },
];

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
