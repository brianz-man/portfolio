// src/data/projects.ts
// Replace these with Brian's real projects.
// "featured: true" projects appear in the highlighted grid at the top.

import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "React - Advice - App",
    description:
      "A simple React app that fetches random advice from the Advice Slip API. Built with React, TypeScript, and styled-components. Perfect for learning how to consume APIs and manage state in a React application.",
    techStack: ["React", "CSS Modules", "TypeScript"],
    liveUrl: "https://react-advice-app-five.vercel.app/",
    repoUrl: "https://github.com/brianz-man",
    featured: true,
    category: "fullstack",
    image: "/projects/",
  },
  {
    id: 2,
    title: "Nationalize Lens",
    description:
      "Nationalize Lens is a simple web application that predicts the likely nationalities of a given name using the Nationalize.io API. Just enter any name and get the nationality predictions with probabilities.",
    techStack: ["HTML/CSS", "JavaScript", "Nationalize.io API"],
    liveUrl: "https://checking-nationality.vercel.app/",
    repoUrl: "https://github.com/brianz-man",
    featured: true,
    category: "fullstack",
    image: "/projects/",
  },
  {
    id: 3,
    title: "MinimalBlogging - Platform ",
    description:
      "A lightweight,Minimal-Blogging-Platformce with a RESTful API. ",
    techStack: ["Express.js", "PostgreSQL", "React", "Prisma ORM"],
    repoUrl: "https://github.com/brianz-man",
    featured: true,
    category: "backend",
    image: "/projects/",
  },
  {
    id: 4,
    title: "A CSS Styled Everday Git Blog",
    description:
      "An accessible,beginner's guide to the fundamentals of Git and version control. Styled with CSS for a clean, modern look. Perfect for developers new to Git or those looking for a refresher.",
    techStack: ["React", "TypeScript", "Storybook", "Rollup", "CSS Modules"],
    repoUrl: "https://github.com/brianz-man",
    liveUrl: "https://css-styled-git-blog-neon.vercel.app/",
    featured: false,
    category: "frontend",
  },

  {
    id: 5,
    title: "An Automated Blight Detection in Potato Leaf using CNN Model",
    description:
      "A Web System that uses a convolutional neural network (CNN) to detect blight in potato leaves from photos. Built with Django and TensorFlow.js.",
    techStack: ["Django", "TensorFlow.js", "React", "PostgreSQL"],
    repoUrl: "https://github.com/brianz-man",
    featured: false,
    category: "fullstack",
  },
];

// ── Helper: get featured projects only ───────────────────────────────────────
export const featuredProjects = projects.filter((p) => p.featured);
