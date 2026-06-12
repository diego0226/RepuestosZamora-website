import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Car, Package, Wrench, User, Clock, Check, TrendingUp, ChevronRight, type LucideIcon } from "lucide-react";
import type { Cita } from "../models/responses/Cita";
import type { Vehiculo } from "../models/responses/Vehiculo";
import { getCitas } from "../services/CitasService";
import { getVehiculosByCliente } from "../services/VehiculoService";
import { getRepuestos } from "../services/Repuesto/RepuestoService";
import { getServices } from "../services/Servicio/ServicionService";
import { useAuth } from "../contexts/AuthContext";
import { SectionTitle } from "./ui/SectionTitle";
import { EstadoBadge } from "./ui/EstadoBadge";
import { Button } from "./ui/Button";
import { ViewIn } from "./ui/ViewIn";
import { fechaLegible, horaDe } from "./ui/format";

const esAbierta = (c: Cita) => ["pendiente", "confirmada"].includes((c.estadoCita || "").toLowerCase());

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [citas, setCitas] = useState<Cita[]>([]);
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [totalRepuestos, setTotalRepuestos] = useState(0);
  const [totalServicios, setTotalServicios] = useState(0);

  useEffect(() => {
    if (!user) return;
    getCitas(user.idCliente).then(setCitas).catch(() => setCitas([]));
    getVehiculosByCliente(user.idCliente).then(setVehiculos).catch(() => setVehiculos([]));
    getRepuestos().then((r) => setTotalRepuestos(r.length)).catch(() => setTotalRepuestos(0));
    getServices().then((s) => setTotalServicios(s.length)).catch(() => setTotalServicios(0));
  }, [user]);

  const proximaCita = citas.find(esAbierta);

  const tiles: { to: string; icon: LucideIcon; label: string; desc: string; count: number | null }[] = [
    { to: "/citas", icon: Calendar, label: "Citas", desc: "Agendá y dale seguimiento", count: citas.length },
    { to: "/vehiculo", icon: Car, label: "Vehículos", desc: "Tu flota registrada", count: vehiculos.length },
    { to: "/repuestos", icon: Package, label: "Repuestos", desc: "Catálogo de partes", count: totalRepuestos },
    { to: "/servicios", icon: Wrench, label: "Servicios", desc: "Mano de obra del taller", count: totalServicios },
    { to: "/perfil", icon: User, label: "Perfil", desc: "Tus datos y sesión", count: null },
  ];

  const stats: { icon: LucideIcon; n: number | string; label: string }[] = [
    { icon: Car, n: vehiculos.length, label: "Vehículos activos" },
    { icon: Clock, n: citas.filter(esAbierta).length, label: "Citas abiertas" },
    { icon: Check, n: citas.filter((c) => c.estadoCita?.toLowerCase() === "confirmada").length, label: "Citas confirmadas" },
    { icon: TrendingUp, n: citas.length, label: "Citas históricas" },
  ];

  return (
    <ViewIn>
      <SectionTitle kicker={`Hola, ${user?.nombre ?? ""}`} title="PANEL DE CONTROL" />

      {/* Próxima cita destacada */}
      {proximaCita && (
        <div className="surface tex-carbon rounded-[10px] mb-[22px] overflow-hidden grid" style={{ gridTemplateColumns: "6px 1fr" }}>
          <div className="hazard" />
          <div className="px-6 py-[22px] flex justify-between items-center gap-[18px] flex-wrap">
            <div className="flex gap-[18px] items-center">
              <div className="w-[52px] h-[52px] rounded-lg grid place-items-center shrink-0 text-primary" style={{ background: "rgba(230,0,0,0.12)" }}>
                <Calendar size={26} />
              </div>
              <div>
                <div className="mono text-[11px] text-secondary uppercase" style={{ letterSpacing: "0.16em" }}>Tu próxima cita</div>
                <div className="font-bold text-white text-[18px] mt-[3px]">{proximaCita.nombreServicio}</div>
                <div className="text-secondary text-[13.5px] mt-0.5">
                  {proximaCita.placa} · <span className="mono">{fechaLegible(proximaCita.fechaCita)} · {horaDe(proximaCita.fechaCita)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <EstadoBadge estado={proximaCita.estadoCita} />
              <Button variant="ghost" size="sm" iconRight={ChevronRight} onClick={() => navigate("/citas")}>Ver citas</Button>
            </div>
          </div>
        </div>
      )}

      {/* Estadísticas rápidas */}
      <div className="grid gap-3.5 mb-[26px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))" }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="surface rounded-lg p-[18px]"
          >
            <s.icon size={20} style={{ color: "var(--primary)" }} />
            <div className="display text-white text-[30px] mt-3">{s.n}</div>
            <div className="mono text-[11px] text-secondary uppercase mt-0.5" style={{ letterSpacing: "0.08em" }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Accesos rápidos */}
      <div className="mono text-[11px] text-secondary uppercase font-bold mb-3.5" style={{ letterSpacing: "0.22em" }}>
        Acceso rápido
      </div>
      <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))" }}>
        {tiles.map((t, i) => (
          <motion.button
            key={t.to}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => navigate(t.to)}
            className="surface surface-hover text-left rounded-[10px] p-[22px] cursor-pointer relative"
          >
            <div className="flex justify-between items-start">
              <div className="w-[46px] h-[46px] rounded-lg grid place-items-center text-primary" style={{ background: "rgba(230,0,0,0.1)" }}>
                <t.icon size={24} />
              </div>
              {t.count != null && (
                <span className="mono text-[26px] font-extrabold" style={{ color: "#2f2f2f" }}>
                  {String(t.count).padStart(2, "0")}
                </span>
              )}
            </div>
            <div className="font-bold text-white text-[18px] mt-[18px]">{t.label}</div>
            <div className="text-secondary text-[13.5px] mt-1">{t.desc}</div>
            <div className="flex items-center gap-1.5 text-primary text-[13px] font-bold mt-4">
              Abrir <ChevronRight size={15} />
            </div>
          </motion.button>
        ))}
      </div>
    </ViewIn>
  );
}
