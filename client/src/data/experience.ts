// src/data/experience.ts
// Work history — rendered as a vertical timeline in the Experience section.
// "description" is an array of strings — each becomes one bullet point.

import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Innovate Hub",
    role: "Junior Software Engineer",
    duration: "April 2026 — Present",
    current: true,
    description: [
      "Lead a distributed team of 6 engineers building a multi-tenant SaaS platform .",
      "Architected a microservices migration reducing monolith deployment time from 45 mins to under 8 mins.",
      "Introduced automated testing pipelines (Jest + Cypress) increasing code coverage from 34% to 87%.",
      "Mentored 4 mid-level engineers through structured code reviews and weekly 1-on-1 technical sessions.",
    ],
    techUsed: ["React", "TypeScript", "Node.js", "AWS", "Docker", "PostgreSQL"],
  },
  {
    id: 2,
    company: "Teach 2 Give",
    role: "Software Engineer II",
    duration: "May 2025 - July 2025",
    current: false,
    description: [
      "Built and maintained M-Pesa API integrations consumed.",
      "Developed internal developer portal that reduced M-Pesa onboarding time by 60%.",
      "Designed real-time transaction monitoring dashboard processing .",
      "Collaborated with product and design to ship 3 major feature releases on schedule.",
    ],
    techUsed: ["Node.js", "React", "MySQL", "Docker", "Django", "TypeScript"],
  },
  {
    id: 3,
    company: "Kenya Hub",
    role: "Junior Software Engineer",
    duration: "Jan 2024 — May 2024",
    current: false,
    description: [
      "Contributed to open-source crisis-mapping platform used in 160+ countries.",
      "Rebuilt the data import pipeline reducing average import time.",
      "Fixed  community-reported bugs across the web and mobile applications.",
      "Wrote technical documentation adopted as the new onboarding guide for contributors.",
    ],
    techUsed: ["JavaScript", "React", "Django", "PostgreSQL", "Git/GitHub"],
  },
  {
    id: 4,
    company: "Freelance",
    role: "Full-Stack Developer",
    duration: "Jun 2026 — March 2026",
    current: false,
    description: [
      "Delivered 2 client projects including e-commerce sites, admin dashboards, and REST APIs.",
      "Worked directly with clients to gather requirements and translate them into technical specs.",
    ],
    techUsed: ["React", "Node.js", "PostgreSQL", "Express.js"],
  },
];
