import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Car, Shield, User, Phone, Check } from "lucide-react";
import type { Cita } from "../models/responses/Cita";
import { getCitaById } from "../services/CitasService";
import { Badge } from "./ui/Badge";
import { EstadoBadge } from "./ui/EstadoBadge";
import { Button } from "./ui/Button";
import { ViewIn } from "./ui/ViewIn";
import { fechaLegible, horaDe } from "./ui/format";

const STEPS = ["Recibido", "Diagnóstico", "En reparación", "Control de calidad", "Listo"];

// Mapea el estado de la cita a la cantidad de pasos completados del tracker.
function progresoDe(estado: string): number {
  switch ((estado || "").toLowerCase()) {
    case "pendiente":
      return 1;
    case "confirmada":
      return 3;
    default:
      return 0;
  }
}

export function CitaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cita, setCita] = useState<Cita | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getCitaById(Number(id))
      .then(setCita)
      .catch((err) => setError(err instanceof Error ? err.message : "Error al cargar la cita"));
  }, [id]);

  if (error) return <p className="text-[#ff5252]">{error}</p>;
  if (!cita) return <p className="text-secondary">Cargando…</p>;

  const cancelada = (cita.estadoCita || "").toLowerCase() === "cancelada";
  const progress = progresoDe(cita.estadoCita);

  const detalles: [string, string, typeof Calendar][] = [
    ["Fecha", fechaLegible(cita.fechaCita), Calendar],
    ["Hora", horaDe(cita.fechaCita), Clock],
    ["Placa", cita.placa, Car],
    ["Cliente", cita.nombreCliente, Shield],
    ["Técnico asignado", cita.nombreEmpleado || "Por asignar", User],
  ];

  return (
    <ViewIn>
      <button
        onClick={() => navigate("/citas")}
        className="mono inline-flex items-center gap-2 bg-transparent border-0 text-secondary cursor-pointer text-[12px] uppercase mb-[18px] font-bold"
        style={{ letterSpacing: "0.1em" }}
      >
        <ArrowLeft size={16} /> Volver a citas
      </button>

      <div className="grid gap-[18px] lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="surface rounded-[10px] overflow-hidden">
          <div className="hazard h-[5px]" />
          <div className="p-[26px]">
            <div className="flex justify-between items-start gap-3.5 flex-wrap">
              <div>
                <Badge tone="gray">Orden #OT-{cita.id}</Badge>
                <h1 className="display text-white text-[30px] mt-3">{cita.nombreServicio}</h1>
              </div>
              <EstadoBadge estado={cita.estadoCita} />
            </div>

            <p className="text-secondary text-[15px] leading-relaxed mt-[18px]">{cita.descripcionProblema}</p>

            <div className="mono text-[11px] text-secondary uppercase font-bold mt-7 mb-4" style={{ letterSpacing: "0.2em" }}>
              Estado del trabajo
            </div>

            {cancelada ? (
              <Badge tone="gray">Esta cita fue cancelada</Badge>
            ) : (
              <div className="flex flex-col">
                {STEPS.map((s, i) => {
                  const done = i < progress;
                  const current = i === progress - 1;
                  return (
                    <div key={s} className="flex gap-3.5 items-stretch">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-[22px] h-[22px] rounded-full shrink-0 grid place-items-center"
                          style={{ background: done ? "var(--primary)" : "transparent", border: done ? "none" : "1px solid var(--line-strong)" }}
                        >
                          {done && <Check size={13} className="text-white" strokeWidth={3} />}
                        </div>
                        {i < STEPS.length - 1 && (
                          <div className="w-0.5 flex-1 min-h-[22px]" style={{ background: i < progress - 1 ? "var(--primary)" : "var(--line)" }} />
                        )}
                      </div>
                      <div className="pb-3.5">
                        <div className="text-[14.5px]" style={{ fontWeight: current ? 700 : 600, color: done ? "#fff" : "var(--secondary)" }}>{s}</div>
                        {current && <div className="mono pulse-dot text-[11px] text-primary mt-0.5">● En curso</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          <div className="surface rounded-[10px] p-[22px]">
            <div className="mono text-[11px] text-secondary uppercase font-bold mb-4" style={{ letterSpacing: "0.2em" }}>Detalles</div>
            {detalles.map(([k, v, Icon]) => (
              <div key={k} className="flex gap-3 items-center py-2.5" style={{ borderBottom: "1px solid var(--line)" }}>
                <Icon size={17} style={{ color: "var(--primary)" }} className="shrink-0" />
                <div className="flex-1">
                  <div className="mono text-[10.5px] text-secondary uppercase" style={{ letterSpacing: "0.08em" }}>{k}</div>
                  <div className="text-white text-sm font-semibold">{v}</div>
                </div>
              </div>
            ))}
          </div>
          {!cancelada && (
            <Button variant="outlineRed" full icon={Phone}>Contactar al taller</Button>
          )}
        </div>
      </div>
    </ViewIn>
  );
}
