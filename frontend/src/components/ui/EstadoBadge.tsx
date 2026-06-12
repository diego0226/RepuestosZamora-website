import { Badge } from "./Badge";

// Normaliza el estado de la cita (el backend usa el enum pendiente/confirmada/cancelada).
type EstadoCfg = { tone: "red" | "amber" | "gray"; dot: boolean; label: string };

const MAP: Record<string, EstadoCfg> = {
  pendiente: { tone: "red", dot: true, label: "Pendiente" },
  confirmada: { tone: "amber", dot: true, label: "Confirmada" },
  cancelada: { tone: "gray", dot: false, label: "Cancelada" },
};

// Insignia de estado de una cita, con punto pulsante para los estados activos.
export function EstadoBadge({ estado }: { estado: string }) {
  const cfg = MAP[(estado || "").toLowerCase()] ?? { tone: "gray", dot: false, label: estado };
  return (
    <Badge tone={cfg.tone}>
      {cfg.dot && <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-current" />}
      {cfg.label}
    </Badge>
  );
}
