// src/components/sections/Projects.tsx
//
// ─── PROJECTS SECTION ────────────────────────────────────────────────────────
// The most important section for a software engineer's portfolio.
// Layout:
//   1. Featured projects — large prominent cards (top 3)
//   2. "Show more" toggle — reveals remaining projects
//   3. Category filter — filter by fullstack / frontend / backend / mobile
//
// KEY CONCEPTS:
//   • useState to toggle "show all" vs "show featured"
//   • useState for active category filter
//   • Derived state — filtered list computed from state + data
//   • Conditional rendering
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, featuredProjects } from "@/data/projects";
import type { ProjectCategory, Project } from "@/types";

// Filter options shown as tabs above the full grid
const filterOptions: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Mobile", value: "mobile" },
  { label: "Web App", value: "Web App" },
];

export function Projects() {
  // Whether to show all projects or just featured ones
  const [showAll, setShowAll] = useState(false);

  // Category filter for the full projects list
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">(
    "all",
  );

  // Derive the list to display based on current state
  // If showAll is false → only featured projects
  // If showAll is true  → filter by selected category
  const displayedProjects = showAll
    ? activeFilter === "all"
      ? projects
      : projects.filter((p: Project) => p.category === activeFilter)
    : featuredProjects;

  return (
    <section id="projects" className="section-wrapper">
      {/* ── Section Header ───────────────────────────────────────── */}
      <SectionTitle
        label="03 — Projects"
        title="What I've Built"
        subtitle={`${projects.length} projects across web, mobile, and backend.`}
      />

      {/* ── FEATURED PROJECTS ────────────────────────────────────── */}
      {/*
        Show featured projects always (they're the highlight).
        Responsive grid: 1 col → 2 col → 3 col
      */}
      {!showAll && (
        <>
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-6">
            ✦ Featured Work
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredProjects.map((project: Project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant="featured"
              />
            ))}
          </div>
        </>
      )}

      {/* ── SHOW ALL STATE ───────────────────────────────────────── */}
      {showAll && (
        <>
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setActiveFilter(option.value)}
                className={`
                  font-mono text-xs px-4 py-2 rounded-lg border
                  transition-all duration-200
                  ${
                    activeFilter === option.value
                      ? "bg-accent text-base border-accent"
                      : "border-surface-border text-text-secondary hover:border-accent/50 hover:text-accent"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* All Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {displayedProjects.map((project: Project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant="default"
              />
            ))}
          </div>

          {/* Empty state if filter has no results */}
          {displayedProjects.length === 0 && (
            <div className="text-center py-16 text-text-muted font-mono text-sm">
              No projects in this category yet.
            </div>
          )}
        </>
      )}

      {/* ── Toggle Button ─────────────────────────────────────────── */}
      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            setShowAll((prev) => !prev);
            setActiveFilter("all"); // Reset filter when toggling
          }}
        >
          {showAll
            ? "← Back to Featured"
            : `View All ${projects.length} Projects →`}
        </Button>
      </div>
    </section>
  );
}
export default Projects;
