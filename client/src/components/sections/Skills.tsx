// src/components/sections/Skills.tsx
//
// ─── SKILLS SECTION ──────────────────────────────────────────────────────────
// Displays Brian's technical skills organized by category.
//
// KEY CONCEPTS:
//   • useState for active tab (category filter)
//   • Array .filter() to show only selected category's skills
//   • Mapping skill level to a visual indicator bar
//   • Tab-based navigation without React Router
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { skills, skillCategories, getSkillsByCategory } from "@/data/skills";
import type { Skill } from "@/types";

// Map skill level to a numeric value (used to draw the progress bar)
const levelToPercent: Record<Skill["level"], number> = {
  expert: 95,
  advanced: 75,
  intermediate: 55,
  learning: 30,
};

// Map skill level to a display label and color
const levelConfig: Record<Skill["level"], { label: string; color: string }> = {
  expert: { label: "Expert", color: "text-accent" },
  advanced: { label: "Advanced", color: "text-blue-400" },
  intermediate: { label: "Intermediate", color: "text-yellow-400" },
  learning: { label: "Learning", color: "text-purple-400" },
};

// Format category name for display (e.g. "frontend" → "Frontend")
const formatCategory = (cat: string) =>
  cat.charAt(0).toUpperCase() + cat.slice(1);

// ── Skill Card ────────────────────────────────────────────────────────────────
// Individual skill item — shows name, level label, and progress bar
function SkillCard({ skill }: { skill: Skill }) {
  const percent = levelToPercent[skill.level];
  const config = levelConfig[skill.level];

  return (
    <div className="card p-4 group hover:shadow-[0_0_20px_#00FFB210] transition-all duration-300">
      {/* Skill name + level */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-body text-text-primary text-sm font-medium">
          {skill.name}
        </span>
        <span className={`font-mono text-xs ${config.color}`}>
          {config.label}
        </span>
      </div>

      {/* Progress bar track */}
      <div className="h-1.5 bg-surface-border rounded-full overflow-hidden">
        {/* Filled portion — width is driven by skill level */}
        <div
          className="h-full bg-accent rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

// ── Main Skills Component ─────────────────────────────────────────────────────
export function Skills() {
  // Track which category tab is currently selected
  const [activeCategory, setActiveCategory] =
    useState<Skill["category"]>("frontend");

  // Get only the skills matching the active tab
  const filteredSkills = getSkillsByCategory(activeCategory);

  // Total skill count for the summary line
  const totalSkills = skills.length;

  return (
    <section id="skills" className="section-wrapper">
      {/* ── Section Header ───────────────────────────────────────── */}
      <SectionTitle
        label="02 — Skills"
        title="Tech Stack"
        subtitle={`${totalSkills} technologies across ${skillCategories.length} categories.`}
      />

      {/* ── Category Tabs ────────────────────────────────────────── */}
      {/*
        These buttons act like tabs — clicking one sets activeCategory,
        which triggers a re-render showing only that category's skills.
        No page navigation, no URL change — just local state.
      */}
      <div className="flex flex-wrap gap-2 mb-10">
        {skillCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              font-mono text-xs px-4 py-2 rounded-lg border
              transition-all duration-200
              ${
                activeCategory === category
                  ? "bg-accent text-base border-accent shadow-[0_0_15px_#00FFB233]"
                  : "border-surface-border text-text-secondary hover:border-accent/50 hover:text-accent"
              }
            `}
          >
            {formatCategory(category)}
            {/* Show count of skills in this category */}
            <span className="ml-2 opacity-60">
              ({getSkillsByCategory(category).length})
            </span>
          </button>
        ))}
      </div>

      {/* ── Skills Grid ──────────────────────────────────────────── */}
      {/*
        CSS Grid with responsive columns:
        - Mobile:  1 column
        - Tablet:  2 columns (sm:)
        - Desktop: 3 columns (lg:)
      */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>

      {/* ── Legend ───────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-surface-border">
        <p className="font-mono text-xs text-text-muted w-full">
          PROFICIENCY LEGEND
        </p>
        {Object.entries(levelConfig).map(([level, config]) => (
          <div key={level} className="flex items-center gap-2">
            <span className={`font-mono text-xs ${config.color}`}>■</span>
            <span className="font-mono text-xs text-text-muted">
              {config.label}
            </span>
            <span className="font-mono text-xs text-text-muted opacity-50">
              ({levelToPercent[level as Skill["level"]]}%)
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Skills;
