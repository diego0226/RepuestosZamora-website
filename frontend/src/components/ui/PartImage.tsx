import type { LucideIcon } from "lucide-react";

interface PartImageProps {
  icon: LucideIcon;
  height?: number;
  big?: boolean;
}

// "Foto referencial" estilizada de una pieza: silueta del icono sobre fondo de carbono con rejilla.
export function PartImage({ icon: Icon, height = 150, big }: PartImageProps) {
  return (
    <div
      className="tex-carbon grid place-items-center relative overflow-hidden"
      style={{ height, background: "radial-gradient(circle at 50% 35%, #262626, #161616)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(142,146,148,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(142,146,148,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <Icon size={big ? 96 : 60} strokeWidth={1.4} className="relative" style={{ color: "rgba(255,255,255,0.16)" }} />
      <span
        className="mono absolute bottom-2 right-2.5 text-[9px]"
        style={{ color: "rgba(142,146,148,0.5)", letterSpacing: "0.1em" }}
      >
        FOTO REFERENCIAL
      </span>
    </div>
  );
}
