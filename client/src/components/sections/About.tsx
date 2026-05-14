// src/components/sections/About.tsx
//
// ─── ABOUT SECTION ───────────────────────────────────────────────────────────
// This section gives visitors a personal feel for who Brian is.
// Layout: Two columns — left has text/stats, right has a stylized avatar card.
//
// KEY CONCEPTS IN THIS FILE:
//   • Importing data from data files (profile.ts)
//   • Using reusable UI components (SectionTitle, Button, Badge)
//   • CSS Grid for two-column layout
//   • Responsive design with md: breakpoint prefix
// ─────────────────────────────────────────────────────────────────────────────

import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { profile } from "@/data/profile";
import { Icon } from "@/components/ui/Icon";
// Stats that appear as highlighted numbers
const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "1", label: "Projects Shipped" },
  { value: "2", label: "Companies" },
  { value: "2+", label: "Users Impacted" },
];

// Personal interests / fun facts shown as badges
const interests = [
  "Open Source",
  "System Design",
  "Mentoring",
  "Dev Tools",
  "Tech Writing",

];

export function About() {
  return (
    <section id="about" className="section-wrapper">
      {/* ── Section Header ───────────────────────────────────────── */}
      <SectionTitle
        label="01 — About"
        title="Who I Am"
        subtitle="A bit about the person behind the code."
      />

      {/* ── Two Column Layout ────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* ── LEFT: Text Content ───────────────────────────────────── */}
        <div className="flex flex-col gap-8">
          {/* Bio paragraphs */}
          <div className="flex flex-col gap-4">
            <p className="font-body text-text-secondary text-lg leading-relaxed">
              {profile.bio}
            </p>
            <p className="font-body text-text-secondary leading-relaxed">
              I believe that great software is built at the intersection of
              <span className="text-accent font-medium">
                {" "}
                technical excellence
              </span>{" "}
              and
              <span className="text-accent font-medium">
                {" "}
                empathy for the user
              </span>
              . Every system I design starts with the question: "What problem
              does this actually solve?"
            </p>
          </div>

          {/* Interests */}
          <div>
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-3">
              Interests & Passions
            </p>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge key={interest} variant="accent" size="md">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <Button
              variant="primary"
              onClick={() => window.open("/resume-brian-nyairo.pdf", "_blank")}
            >
              Download Resume
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Let's Talk
            </Button>
          </div>
        </div>

        {/* ── RIGHT: Stats + Avatar Card ───────────────────────────── */}
        <div className="flex flex-col gap-8">
          {/* Stats Grid — 2x2 */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="card p-6 flex flex-col gap-1 group hover:shadow-[0_0_30px_#00FFB215]"
              >
                <span className="font-display text-4xl font-black text-accent group-hover:text-glow transition-all">
                  {stat.value}
                </span>
                <span className="font-body text-sm text-text-secondary">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Location + Availability Card */}
          <div className="card p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon name="location_on" size="md" className="text-accent" />
              </div>
              <div>
                <p className="font-body text-text-primary font-medium">
                  {profile.location}
                </p>
                <p className="font-mono text-xs text-text-muted">Based in</p>
              </div>
            </div>

            <div className="h-px bg-surface-border" />

            {/* Availability */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon name="work" size="md" className="text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Icon
                    name="circle"
                    size="sm"
                    className="text-accent animate-pulse"
                  />
                  <p className="font-body text-text-primary font-medium">
                    Open to Opportunities
                  </p>
                </div>
                <p className="font-mono text-xs text-text-muted">
                  Remote / Hybrid preferred
                </p>
              </div>
            </div>

            <div className="h-px bg-surface-border" />

            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon name="email" size="md" className="text-accent" />
              </div>
              <div>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-body text-accent hover:underline text-sm"
                >
                  {profile.email}
                </a>
                <p className="font-mono text-xs text-text-muted">
                  Reach out directly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// Add this at the very bottom of the file
export default About;
