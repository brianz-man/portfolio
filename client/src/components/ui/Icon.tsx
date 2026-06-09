interface IconProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Icon({ name, className = "", size = "md" }: IconProps) {
  const sizes = {
    sm: "text-base", // 16px
    md: "text-2xl", // 24px
    lg: "text-4xl", // 36px
  };

  return (
    <span
      className={`material-icons ${sizes[size]} ${className}`}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
