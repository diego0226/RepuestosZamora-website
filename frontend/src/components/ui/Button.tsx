import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type Variant = "primary" | "ghost" | "outlineRed";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  full?: boolean;
}

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  outlineRed: "btn-outline-red",
};

const sizeClass: Record<Size, string> = {
  sm: "px-3.5 py-2 text-[13px]",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-[15px] text-[15px]",
};

// Botón estándar del panel, con variantes e iconos opcionales (izquierda/derecha).
export function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  full,
  className = "",
  ...rest
}: ButtonProps) {
  const iconSize = size === "sm" ? 16 : 18;
  return (
    <button
      className={`inline-flex items-center justify-center gap-2.5 font-bold rounded cursor-pointer ${variantClass[variant]} ${sizeClass[size]} ${full ? "w-full" : ""} ${className}`}
      style={{ letterSpacing: "0.01em" }}
      {...rest}
    >
      {Icon && <Icon size={iconSize} strokeWidth={2.4} />}
      {children}
      {IconRight && <IconRight size={iconSize} strokeWidth={2.4} />}
    </button>
  );
}
