export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[]; // e.g. ["React", "TypeScript", "Node.js"]
  liveUrl?: string; // Optional — not all projects are deployed
  repoUrl?: string; // Optional — not all projects are open source
  featured: boolean; // Featured projects show larger on the page
  image?: string; // Optional project screenshot path
  category: ProjectCategory; // Used for filtering
}

export type ProjectCategory =
  | "fullstack"
  | "frontend"
  | "backend"
  | "mobile"
  | "Web App";

// ── Skill ─────────────────────────────────────────────────────────────────────
// One skill entry in the Skills section
export interface Skill {
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  icon?: string; // Optional icon name from react-icons
}

export type SkillLevel = "expert" | "advanced" | "intermediate" | "learning";
export type SkillCategory =
  | "frontend"
  | "backend"
  | "devops"
  | "tools"
  | "languages";

// ── Experience ────────────────────────────────────────────────────────────────
// One job / role in the Experience / Timeline section
export interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string; // e.g. "Jan 2022 — Present"
  description: string[]; // Array of bullet point achievements
  techUsed: string[];
  current: boolean; // Is this the current position?
}

// ── SocialLink ────────────────────────────────────────────────────────────────
// Links shown in the Hero and Footer
export interface SocialLink {
  name: string;
  url: string;
  icon: string; // Icon component name
}

// ── ContactForm ───────────────────────────────────────────────────────────────
// The shape of data submitted via the contact form
// This is sent as JSON to our Express backend
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ── NavItem ───────────────────────────────────────────────────────────────────
// One item in the navigation bar
export interface NavItem {
  label: string;
  href: string; // anchor link e.g. "#projects"
}

// ── Profile ───────────────────────────────────────────────────────────────────
// Core info about the engineer — used in Hero + About sections
export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  resumeUrl?: string;
  avatar?: string;
  socials: SocialLink[];
}
