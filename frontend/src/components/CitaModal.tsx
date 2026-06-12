import { useState } from "react";
import { X, Check, AlertTriangle } from "lucide-react";
import type { Servicio } from "../models/Servicio/responses/Servicio";
import type { Vehiculo } from "../models/responses/Vehiculo";
import { createCita } from "../services/CitasService";
import { useAuth } from "../contexts/AuthContext";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { IconButton } from "./ui/IconButton";

interface CitaModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  servicios: Servicio[];
  vehiculos: Vehiculo[];
}

// Modal para agendar una nueva cita. El formulario se monta solo cuando el modal está abierto,
// por lo que su estado se inicializa de forma natural sin necesidad de efectos.
export function CitaModal({ open, onClose, onSaved, servicios, vehiculos }: CitaModalProps) {
  return (
    <Modal open={open} onClose={onClose} maxWidth={480}>
      <CitaForm onClose={onClose} onSaved={onSaved} servicios={servicios} vehiculos={vehiculos} />
    </Modal>
  );
}

const labelClass = "mono text-[11px] uppercase text-secondary mb-1.5 font-semibold block";
const selectClass = "field w-full rounded text-sm px-3.5 py-3";

function CitaForm({
  onClose,
  onSaved,
  servicios,
  vehiculos,
}: Omit<CitaModalProps, "open">) {
  const { user } = useAuth();
  const [idServicio, setIdServicio] = useState("");
  const [placa, setPlaca] = useState("");
  const [fechaCita, setFechaCita] = useState("");
  const [descripcionProblema, setDescripcion] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit() {
    if (!user) return;
    if (!idServicio || !placa || !fechaCita || !descripcionProblema.trim()) {
      setError("Completá todos los campos para agendar la cita.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await createCita({
        idCliente: user.idCliente,
        idServicio: Number(idServicio),
        placa,
        fechaCita,
        descripcionProblema: descripcionProblema.trim(),
      });
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo agendar la cita");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="px-7 pt-6 pb-7">
      <div className="flex justify-between items-center mb-5">
        <h2 className="display text-white text-[24px] m-0">AGENDAR CITA</h2>
        <IconButton icon={X} onClick={onClose} size={18} />
      </div>

      <div className="flex flex-col gap-3.5">
        <div>
          <label className={labelClass}>Servicio</label>
          <select className={selectClass} value={idServicio} onChange={(e) => setIdServicio(e.target.value)}>
            <option value="">Seleccioná un servicio…</option>
            {servicios.map((s) => (
              <option key={s.idServicio} value={s.idServicio}>{s.nombreServicio}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Vehículo</label>
          <select className={selectClass} value={placa} onChange={(e) => setPlaca(e.target.value)}>
            <option value="">Seleccioná un vehículo…</option>
            {vehiculos.map((v) => (
              <option key={v.placa} value={v.placa}>{v.marca} {v.modelo} · {v.placa}</option>
            ))}
          </select>
          {vehiculos.length === 0 && (
            <p className="text-secondary text-[12px] mt-1.5">Primero registrá un vehículo en la sección Vehículos.</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Fecha y hora</label>
          <input type="datetime-local" className={selectClass} value={fechaCita} onChange={(e) => setFechaCita(e.target.value)} />
        </div>

        <div>
          <label className={labelClass}>Descripción del problema</label>
          <textarea
            className={selectClass}
            rows={3}
            placeholder="Contanos qué le pasa al vehículo…"
            value={descripcionProblema}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        {error && (
          <div className="flex gap-2 items-center text-[#ff5252] text-[13px]">
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        <Button variant="primary" size="lg" full icon={Check} onClick={handleSubmit} disabled={saving} className="mt-1.5">
          {saving ? "Agendando…" : "Agendar cita"}
        </Button>
      </div>
    </div>
  );
}
