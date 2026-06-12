import { forwardRef, type InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
}

// Campo de formulario con etiqueta, icono opcional y mensaje de error.
// Usa forwardRef para ser compatible con react-hook-form (register()).
export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, icon: Icon, error, className = "", ...rest }, ref) => {
    return (
      <label className="block">
        {label && (
          <div
            className="mono text-[11px] uppercase text-secondary mb-1.5 font-semibold"
            style={{ letterSpacing: "0.1em" }}
          >
            {label}
          </div>
        )}
        <div className="relative flex items-center">
          {Icon && (
            <span className="absolute left-3.5 text-secondary grid place-items-center">
              <Icon size={17} />
            </span>
          )}
          <input
            ref={ref}
            className={`field w-full rounded text-sm ${Icon ? "pl-10 pr-3.5 py-3" : "px-3.5 py-3"} ${className}`}
            {...rest}
          />
        </div>
        {error && <p className="text-[#ff5252] text-[13px] mt-1.5">{error}</p>}
      </label>
    );
  }
);

Field.displayName = "Field";
