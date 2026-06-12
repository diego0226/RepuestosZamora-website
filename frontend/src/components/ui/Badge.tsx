import type { CSSProperties, ReactNode } from "react";

type Tone = "red" | "amber" | "gray" | "neutral";

const toneStyle: Record<Tone, CSSProperties> = {
  red: { background: "rgba(230,0,0,0.14)", color: "#ff5252", border: "1px solid rgba(230,0,0,0.4)" },
  amber: { background: "rgba(230,0,0,0.14)", color: "#ff7a3c", border: "1px solid rgba(255,122,60,0.4)" },
  gray: { background: "rgba(142,146,148,0.12)", color: "var(--secondary)", border: "1px solid var(--line-strong)" },
  neutral: { background: "rgba(142,146,148,0.12)", color: "var(--secondary)", border: "1px solid var(--line-strong)" },
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

// Etiqueta monoespaciada en mayúsculas usada para estados, categorías y metadatos.
export function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`mono inline-flex items-center gap-1.5 text-[11px] font-bold uppercase rounded-[3px] px-2.5 py-1 ${className}`}
      style={{ letterSpacing: "0.08em", ...toneStyle[tone] }}
    >
      {children}
    </span>
  );
}
