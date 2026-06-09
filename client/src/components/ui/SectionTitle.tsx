interface SectionTitleProps {
  label?: string; // Small text above the title e.g. "03 — About"
  title: string; // Main large heading
  subtitle?: string; // Optional description below
  align?: "left" | "center";
}

export function SectionTitle({
  label,
  title,
  subtitle,
  align = "left",
}: SectionTitleProps) {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 mb-12 ${alignment}`}>
      {/* Small label above — e.g. "01 — Work" */}
      {label && (
        <span
          className="font-mono  text-xs tracking-widest uppercase"
          style={{ color: "var(--accent)" }}
        >
          {label}
        </span>
      )}

      {/* Main section heading */}
      <h2
        className="font-display text-4xl md:text-5xl font-bold  leading-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>

      {/* Optional subtitle */}
      {subtitle && (
        <p
          className="font-body text-lg max-w-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
        </p>
      )}

      {/* Decorative line uses accent under the title */}
       <div className={`flex gap-2 mt-1 ${align === 'center' ? 'justify-center' : ''}`}>
        <div className="h-0.5 w-12 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
        <div className="h-0.5 w-4 rounded-full" style={{ backgroundColor: 'var(--accent)', opacity: 0.3 }} />
      </div>
    </div>
  );
}
