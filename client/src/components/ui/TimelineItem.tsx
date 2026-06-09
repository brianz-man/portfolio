import { Badge } from "@/components/ui/Badge";
import type { Experience } from "@/types";

interface TimelineItemProps {
  experience: Experience;
  isLast: boolean; // Controls whether to show the connecting line below
}

export function TimelineItem({ experience, isLast }: TimelineItemProps) {
  return (
    <div className="flex gap-6 group">
      {/* ── Timeline Visual: Dot + Line ──────────────────────────── */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* The dot — glowing if current role */}
        <div
          className={`
            w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 z-10
            transition-all duration-300
            ${
              experience.current
                ? "bg-accent border-accent shadow-[0_0_10px_#00FFB2]"
                : "bg-base border-surface-border group-hover:border-accent"
            }
          `}
        />

        {/* Vertical connecting line — hidden for last item */}
        {!isLast && (
          <div className="w-px flex-1 bg-surface-border mt-2 min-h-[40px]" />
        )}
      </div>

      {/* ── Content Card ────────────────────────────────────────── */}
      <div className="card p-6 flex-1 mb-6 group-hover:shadow-[0_0_25px_#00FFB210] transition-all duration-300">
        {/* ── Header: Role + Duration ──────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            {/* Job title */}
            <h3 className="font-display text-lg font-bold text-text-primary">
              {experience.role}
            </h3>

            {/* Company name */}
            <p className="font-body text-accent font-medium">
              {experience.company}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-1">
            {/* Duration */}
            <span className="font-mono text-xs text-text-muted whitespace-nowrap">
              {experience.duration}
            </span>

            {/* "Current" badge if this is the active position */}
            {experience.current && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Current
              </span>
            )}
          </div>
        </div>

        {/* ── Bullet Points: Achievements ──────────────────────── */}
        {/*
          Each string in experience.description becomes one bullet point.
          This is more readable and semantic than one long paragraph.
        */}
        <ul className="flex flex-col gap-2 mb-5">
          {experience.description.map((point, index) => (
            <li key={index} className="flex gap-3 text-sm">
              {/* Custom bullet */}
              <span className="text-accent mt-1 flex-shrink-0 font-mono">
                ▸
              </span>
              <span className="font-body text-text-secondary leading-relaxed">
                {point}
              </span>
            </li>
          ))}
        </ul>

        {/* ── Tech Used ───────────────────────────────────────── */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-surface-border">
          {experience.techUsed.map((tech) => (
            <Badge key={tech} variant="default" size="sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
