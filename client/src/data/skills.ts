// src/data/skills.ts
// Skills are grouped by category so the Skills section
// can render them in organized columns/tabs.

import type { Skill } from "@/types";

export const skills: Skill[] = [
  // ── Languages ─────────────────────────────────────────────────────────────
  { name: "TypeScript", level: "expert", category: "languages" },
  { name: "JavaScript", level: "expert", category: "languages" },
  { name: "Python", level: "advanced", category: "languages" },
  { name: "Php", level: "intermediate", category: "languages" },
  { name: "Kotlin", level: "advanced", category: "languages" },

  // ── Frontend ──────────────────────────────────────────────────────────────
  { name: "React", level: "expert", category: "frontend" },
  { name: "Next.js", level: "expert", category: "frontend" },
  { name: "TailwindCSS", level: "expert", category: "frontend" },
  { name: "Framer Motion", level: "advanced", category: "frontend" },
  { name: "React Native", level: "advanced", category: "frontend" },
  { name: "Flutter", level: "intermediate", category: "frontend" },

  // ── Backend ───────────────────────────────────────────────────────────────
  { name: "Node.js", level: "expert", category: "backend" },
  { name: "Express.js", level: "expert", category: "backend" },
  { name: "PostgreSQL", level: "advanced", category: "backend" },
  { name: "MongoDB", level: "intermediate", category: "backend" },
  { name: "Prisma", level: "advanced", category: "backend" },
  { name: "Django", level: "expert", category: "backend" },

  // ── DevOps ────────────────────────────────────────────────────────────────
  { name: "Docker", level: "intermediate", category: "devops" },
  { name: "GitHub Actions", level: "advanced", category: "devops" },
  { name: "AWS", level: "intermediate", category: "devops" },
  { name: "Linux", level: "advanced", category: "devops" },

  // ── Tools ─────────────────────────────────────────────────────────────────
  { name: "Git", level: "expert", category: "tools" },
  { name: "Figma", level: "advanced", category: "tools" },
  { name: "Postman", level: "expert", category: "tools" },
  { name: "GitLab", level: "advanced", category: "tools" },
  { name: "VS Code", level: "expert", category: "tools" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
// These functions filter skills by category — used in the Skills component
export const getSkillsByCategory = (category: Skill["category"]) =>
  skills.filter((s) => s.category === category);

export const skillCategories: Skill["category"][] = [
  "languages",
  "frontend",
  "backend",
  "devops",
  "tools",
];
