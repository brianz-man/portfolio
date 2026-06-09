import React from "react";
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "accent";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}: BadgeProps) {
  const base = `
    inline-flex items-center font-mono rounded-md
    transition-colors duration-150
  `;

  const variants = {
    default:
      "",
    outline: "",
    accent: "",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };
  const getStyle = (variant: string) => {
  if (variant === 'accent') return {
    backgroundColor: 'var(--accent-glow)',
    color: 'var(--accent)',
    border: '1px solid var(--accent)',
  }
  if (variant === 'outline') return {
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
    backgroundColor: 'transparent',
  }
  return {
    backgroundColor: 'var(--bg-hover)',
    border: '1px solid var(--border)',
    color: 'var(--text-muted)',
  }
}

  return (
    <span
      className={`${base} ${sizes[size]} ${className}`}
      style={getStyle(variant)}
    >
      {children}
    </span>
  );
}
