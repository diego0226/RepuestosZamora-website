import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Car, Plus, Pencil, Trash2 } from "lucide-react";
import type { Vehiculo } from "../models/responses/Vehiculo";
import { getVehiculosByCliente, deleteVehiculo } from "../services/VehiculoService";
import { useAuth } from "../contexts/AuthContext";
import { SectionTitle } from "./ui/SectionTitle";
import { Button } from "./ui/Button";
import { IconButton } from "./ui/IconButton";
import { ViewIn } from "./ui/ViewIn";
import { VehiculoModal } from "./VehiculoModal";

export function VehiculoList() {
  const { user } = useAuth();
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<{ open: boolean; editing: Vehiculo | null }>({ open: false, editing: null });

  const cargar = useCallback(() => {
    if (!user) return;
    getVehiculosByCliente(user.idCliente)
      .then(setVehiculos)
      .catch((err) => setError(err instanceof Error ? err.message : "Error al cargar vehículos"));
  }, [user]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  async function handleDelete(placa: string) {
    if (!confirm(`¿Eliminar el vehículo ${placa}?`)) return;
    try {
      await deleteVehiculo(placa);
      cargar();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar el vehículo");
    }
  }

  return (
    <ViewIn>
      <SectionTitle
        kicker="Tu flota"
        title="MIS VEHÍCULOS"
        action={<Button variant="primary" icon={Plus} onClick={() => setModal({ open: true, editing: null })}>Agregar vehículo</Button>}
      />

      {error && <p className="text-[#ff5252] mb-4">{error}</p>}

      <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))" }}>
        {vehiculos.map((v, i) => (
          <motion.div
            key={v.placa}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
            className="surface surface-hover rounded-[10px] overflow-hidden"
          >
            <div className="tex-carbon flex justify-between items-center px-[22px] py-5" style={{ background: "#1a1a1a", borderBottom: "1px solid var(--line)" }}>
              <div className="w-[50px] h-[50px] rounded-lg grid place-items-center text-primary" style={{ background: "rgba(230,0,0,0.1)" }}>
                <Car size={28} />
              </div>
              <div className="mono rounded px-[11px] py-1.5 text-[15px] font-bold text-white" style={{ background: "#0f0f0f", border: "1px solid var(--line-strong)", letterSpacing: "0.14em" }}>
                {v.placa}
              </div>
            </div>
            <div className="p-[22px]">
              <div className="font-bold text-white text-[19px]">{v.marca} {v.modelo}</div>
              <div className="mono text-[12.5px] text-secondary mt-1">Año {v.anio}</div>
              <div className="flex gap-2 mt-[18px]">
                <Button variant="ghost" size="sm" icon={Pencil} onClick={() => setModal({ open: true, editing: v })} className="flex-1">Editar</Button>
                <IconButton icon={Trash2} onClick={() => handleDelete(v.placa)} size={17} title="Eliminar" style={{ borderColor: "rgba(230,0,0,0.4)", color: "var(--primary)" }} />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Tarjeta para agregar */}
        <button
          onClick={() => setModal({ open: true, editing: null })}
          className="rounded-[10px] bg-transparent text-secondary cursor-pointer grid place-items-center min-h-[220px] gap-2.5"
          style={{ border: "1.5px dashed var(--line-strong)" }}
        >
          <div className="w-12 h-12 rounded-full grid place-items-center" style={{ border: "1px solid var(--line-strong)" }}>
            <Plus size={24} style={{ color: "var(--primary)" }} />
          </div>
          <span className="mono text-[12px] uppercase font-bold" style={{ letterSpacing: "0.1em" }}>Agregar vehículo</span>
        </button>
      </div>

      <VehiculoModal
        open={modal.open}
        editing={modal.editing}
        onClose={() => setModal({ open: false, editing: null })}
        onSaved={cargar}
      />
    </ViewIn>
  );
}
