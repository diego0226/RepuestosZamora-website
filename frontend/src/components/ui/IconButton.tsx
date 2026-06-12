import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  size?: number;
  active?: boolean;
}

// Botón cuadrado de solo icono (cerrar modal, eliminar, etc.).
export function IconButton({ icon: Icon, size = 20, active, className = "", style, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      className={`grid place-items-center w-10 h-10 rounded cursor-pointer ${className}`}
      style={{
        border: "1px solid var(--line-strong)",
        background: active ? "rgba(230,0,0,0.12)" : "transparent",
        color: active ? "var(--primary)" : "var(--text)",
        ...style,
      }}
      {...rest}
    >
      <Icon size={size} strokeWidth={2.2} />
    </button>
  );
}
