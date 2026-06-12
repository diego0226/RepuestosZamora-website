import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Car, Clock, ChevronRight, Plus } from "lucide-react";
import type { Cita } from "../models/responses/Cita";
import type { Servicio } from "../models/Servicio/responses/Servicio";
import type { Vehiculo } from "../models/responses/Vehiculo";
import { getCitas } from "../services/CitasService";
import { getServices } from "../services/Servicio/ServicionService";
import { getVehiculosByCliente } from "../services/VehiculoService";
import { useAuth } from "../contexts/AuthContext";
import { SectionTitle } from "./ui/SectionTitle";
import { EstadoBadge } from "./ui/EstadoBadge";
import { EmptyState } from "./ui/EmptyState";
import { Button } from "./ui/Button";
import { ViewIn } from "./ui/ViewIn";
import { CitaModal } from "./CitaModal";
import { diaDe, mesDe, horaDe } from "./ui/format";

const FILTROS = ["Todas", "pendiente", "confirmada", "cancelada"];
const FILTRO_LABEL: Record<string, string> = {
  Todas: "Todas",
  pendiente: "Pendiente",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
};

export function CitaList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [citas, setCitas] = useState<Cita[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [modalOpen, setModalOpen] = useState(false);

  const cargarCitas = useCallback(() => {
    if (!user) return;
    getCitas(user.idCliente)
      .then(setCitas)
      .catch((err) => setError(err instanceof Error ? err.message : "Error al cargar citas"));
  }, [user]);

  useEffect(() => {
    cargarCitas();
  }, [cargarCitas]);

  useEffect(() => {
    if (!user) return;
    getServices().then(setServicios).catch(() => setServicios([]));
    getVehiculosByCliente(user.idCliente).then(setVehiculos).catch(() => setVehiculos([]));
  }, [user]);

  const list = filter === "Todas" ? citas : citas.filter((c) => (c.estadoCita || "").toLowerCase() === filter);

  return (
    <ViewIn>
      <SectionTitle
        kicker="Agenda del taller"
        title="MIS CITAS"
        action={<Button variant="primary" icon={Plus} onClick={() => setModalOpen(true)}>Agendar cita</Button>}
      />

      <div className="flex gap-2 mb-5 flex-wrap">
        {FILTROS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="mono px-[15px] py-2 rounded text-[12px] font-bold uppercase cursor-pointer"
            style={{
              letterSpacing: "0.06em",
              border: "1px solid " + (filter === f ? "var(--primary)" : "var(--line-strong)"),
              background: filter === f ? "rgba(230,0,0,0.12)" : "transparent",
              color: filter === f ? "var(--primary)" : "var(--secondary)",
            }}
          >
            {FILTRO_LABEL[f]}
          </button>
        ))}
      </div>

      {error && <p className="text-[#ff5252] mb-4">{error}</p>}

      <div className="flex flex-col gap-3">
        {list.map((c, i) => (
          <motion.button
            key={c.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => navigate(`/citas/${c.id}`)}
            className="surface surface-hover text-left rounded-lg p-5 cursor-pointer grid items-center gap-[18px]"
            style={{ gridTemplateColumns: "auto 1fr auto" }}
          >
            <div className="text-center pr-[18px] min-w-16" style={{ borderRight: "1px solid var(--line)" }}>
              <div className="display text-white text-[26px]">{diaDe(c.fechaCita)}</div>
              <div className="mono text-[11px] text-primary uppercase" style={{ letterSpacing: "0.1em" }}>{mesDe(c.fechaCita)}</div>
            </div>
            <div className="min-w-0">
              <div className="flex gap-2.5 items-center flex-wrap">
                <span className="font-bold text-white text-base">{c.nombreServicio}</span>
                <EstadoBadge estado={c.estadoCita} />
              </div>
              <div className="text-secondary text-[13.5px] mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                {c.descripcionProblema}
              </div>
              <div className="mono text-[12px] text-secondary mt-[7px] flex gap-3.5 flex-wrap">
                <span className="inline-flex items-center gap-1"><Car size={13} />{c.placa}</span>
                <span className="inline-flex items-center gap-1"><Clock size={13} />{horaDe(c.fechaCita)}</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-secondary" />
          </motion.button>
        ))}
        {list.length === 0 && !error && <EmptyState icon={Calendar} text="No hay citas en este estado." />}
      </div>

      <CitaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={cargarCitas}
        servicios={servicios}
        vehiculos={vehiculos}
      />
    </ViewIn>
  );
}
