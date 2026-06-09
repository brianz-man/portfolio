import { SectionTitle } from "@/components/ui/SectionTitle";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { experiences } from "@/data/experience";

export function Experience() {
  // Calculate total years of experience
  // We derive this from the data — no hardcoding
  const currentYear = new Date().getFullYear();
  const startYear = 2024;
  const totalYears = currentYear - startYear;

  // Count companies (unique)
  const totalCompanies = experiences.length;

  return (
    <section id="experience" className="section-wrapper">
      {/* ── Section Header ───────────────────────────────────────── */}
      <SectionTitle
        label="04 — Experience"
        title="Where I've Worked"
        subtitle="My professional journey building products at scale."
      />

      {/* ── Two column layout: Timeline + Summary ────────────────── */}
      <div className="grid lg:grid-cols-3 gap-12 items-start">
        {/* ── LEFT: Timeline (takes 2/3 of width on large screens) ── */}
        <div className="lg:col-span-2">
          {/*
            .map() gives us each experience AND its index.
            We use the index to check if it's the last item (no line below).
          */}
          {experiences.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              experience={exp}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>

        {/* ── RIGHT: Summary Stats Sidebar ─────────────────────── */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-24">
          {/* Sticky: stays visible as user scrolls the timeline */}

          {/* Years card */}
          <div className="card p-6 text-center group hover:shadow-[0_0_25px_#00FFB215]">
            <div className="font-display text-5xl font-black text-accent mb-2">
              {totalYears}+
            </div>
            <div className="font-body text-text-secondary text-sm">
              Years of Experience
            </div>
          </div>

          {/* Companies card */}
          <div className="card p-6 text-center group hover:shadow-[0_0_25px_#00FFB215]">
            <div className="font-display text-5xl font-black text-accent mb-2">
              {totalCompanies}
            </div>
            <div className="font-body text-text-secondary text-sm">
              Companies / Clients
            </div>
          </div>

          {/* Education card */}
          <div className="card p-6 flex flex-col gap-3">
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase">
              Education
            </p>
            <div>
              <p className="font-display font-bold text-text-primary">
                BSc. Software Engineering
              </p>
              <p className="font-body text-accent text-sm">
                Murang'a University of Technology
              </p>
              <p className="font-mono text-xs text-text-muted mt-1">
                2022 — 2026
              </p>
            </div>
          </div>

          {/* Certifications card */}
          <div className="card p-6 flex flex-col gap-3">
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase">
              Certifications
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Operating System Basics",
                "Machine Learning Using Python",
                "Network Support And Security",
                "AWS Certified Security-Speciality",
                "Network Addressing and Basic Troubleshooting",
              ].map((cert) => (
                <li key={cert} className="flex gap-2 items-start">
                  <span className="text-accent font-mono text-xs mt-0.5">
                    ▸
                  </span>
                  <span className="font-body text-text-secondary text-sm">
                    {cert}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Experience;
