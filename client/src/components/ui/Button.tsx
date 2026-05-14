// src/components/ui/Button.tsx
//
// ─── REUSABLE UI COMPONENT ───────────────────────────────────────────────────
// This is an "atom" — the smallest reusable unit of UI.
// We build ONE Button component that handles all variants:
//   primary  → filled with accent color (main CTAs)
//   outline  → border only (secondary actions)
//   ghost    → no border, subtle hover (nav links, icon buttons)
//
// WHY NOT JUST USE <button>?
// Because we'd repeat the same classes everywhere. One change here
// updates every button across the entire portfolio.
//
// "extends React.ButtonHTMLAttributes<HTMLButtonElement>" means
// the Button accepts ALL standard HTML button props (onClick, type, disabled, etc.)
// in addition to our custom ones.
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  loading = false,
  className = "",
  disabled,
  ...rest // All other standard button props (onClick, type, etc.)
}: ButtonProps) {
  // ── Base classes — applied to ALL variants ─────────────────────────────────
  const base = `
    inline-flex items-center justify-center gap-2
    font-body font-medium rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-accent/50
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? "w-full" : ""}
  `;

  // ── Variant-specific classes ───────────────────────────────────────────────
  const variants = {
    primary: `
      bg-accent text-base hover:bg-accent-dim
      shadow-[0_0_20px_#00FFB233] hover:shadow-[0_0_30px_#00FFB266]
    `,
    outline: `
      border border-accent text-accent
      hover:bg-accent hover:text-base
    `,
    ghost: `
      text-text-secondary hover:text-accent hover:bg-surface-hover
    `,
  };

  // ── Size-specific classes ─────────────────────────────────────────────────
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  // Use inline styles so buttons respond to CSS variables in both modes
  const getStyle = () => {
    if (variant === "primary")
      return {
        backgroundColor: "var(--accent)",
        color: "#fff",
      };
    if (variant === "outline")
      return {
        border: "1.5px solid var(--accent)",
        color: "var(--accent)",
        backgroundColor: "transparent",
      };
    return {
      color: "var(--text-secondary)",
      backgroundColor: "transparent",
    };
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${className}`}
      style={getStyle()}
      disabled={disabled || loading}
      {...rest}
    >
      {/* Show a spinner when loading */}
      {loading && (
        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
