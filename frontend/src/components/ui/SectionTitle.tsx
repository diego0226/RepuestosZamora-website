import type { ReactNode } from "react";

interface SectionTitleProps {
  kicker?: string;
  title: string;
  action?: ReactNode;
}

// Encabezado de sección: kicker rojo en mayúsculas + título grande + acción opcional a la derecha.
export function SectionTitle({ kicker, title, action }: SectionTitleProps) {
  return (
    <div className="flex items-end justify-between gap-4 mb-[22px] flex-wrap">
      <div>
        {kicker && (
          <div
            className="mono text-[11px] uppercase text-primary font-bold mb-2"
            style={{ letterSpacing: "0.22em" }}
          >
            {kicker}
          </div>
        )}
        <h1 className="display text-white m-0" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
          {title}
        </h1>
      </div>
      {action}
    </div>
  );
}
