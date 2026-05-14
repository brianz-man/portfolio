// src/data/profile.ts
//
// ─── WHY SEPARATE DATA FILES? ────────────────────────────────────────────────
// All content lives here — NOT hardcoded inside components.
// This means:
//   • Updating your name/bio = edit ONE file, not 10 components
//   • Components stay clean and reusable
//   • Later you can swap this for an API/CMS without touching UI
// ─────────────────────────────────────────────────────────────────────────────

import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Brian Nyairo",
  title: "Junior Software Engineer",
  tagline: "Building scalable systems & elegant interfaces.",
  location: "Nairobi, Kenya",
  email: "nyasentebrian@gmail.com",

  bio: `I'm a Junior Software Engineer with 2+ years of experience designing
  and building high-performance web applications. I specialize in full-stack
  development with a deep focus on clean architecture, developer experience,
  and scalable system design. When I'm not coding, I'm mentoring junior
  developers and contributing to open-source.`,

  resumeUrl: "/resume-brian-nyairo.pdf",
  avatar: "/avatar.jpg", // Place your photo in /public/avatar.jpg

  socials: [
    {
      name: "GitHub",
      url: "https://github.com/brianz-man",
      icon: "FiGithub",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/brian-hero-b80451264",
      icon: "FiLinkedin",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/herozion39",
      icon: "FiTwitter",
    },
  ],
};
