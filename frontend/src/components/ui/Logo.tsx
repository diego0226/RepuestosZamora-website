import { Wrench } from "lucide-react";

interface LogoProps {
  size?: number;
  withText?: boolean;
}

// Logotipo de Repuestos Zamora: llave inglesa sobre cuadro rojo con esquina cortada + wordmark.
export function Logo({ size = 34, withText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="corner-cut grid place-items-center shrink-0 bg-primary"
        style={{ width: size, height: size }}
      >
        <Wrench size={size * 0.56} strokeWidth={2.4} className="text-white" />
      </div>
      {withText && (
        <div className="leading-none">
          <div className="display text-white text-[18px]" style={{ letterSpacing: "-0.04em" }}>
            REPUESTOS
          </div>
          <div
            className="mono text-primary text-[11px] font-bold"
            style={{ letterSpacing: "0.32em" }}
          >
            ZAMORA
          </div>
        </div>
      )}
    </div>
  );
}
