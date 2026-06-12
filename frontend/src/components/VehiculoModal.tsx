import { useState } from "react";
import { X, Check, Plus, AlertTriangle } from "lucide-react";
import type { Vehiculo } from "../models/responses/Vehiculo";
import { createVehiculo, updateVehiculo } from "../services/VehiculoService";
import { useAuth } from "../contexts/AuthContext";
import { Modal } from "./ui/Modal";
import { Field } from "./ui/Field";
import { Button } from "./ui/Button";
import { IconButton } from "./ui/IconButton";

interface VehiculoModalProps {
  open: boolean;
  editing: Vehiculo | null;
  onClose: () => void;
  onSaved: () => void;
}

// Modal para crear o editar un vehículo. El formulario se monta solo cuando el modal está abierto,
// así que su estado se inicializa directamente desde el vehículo en edición, sin efectos.
export function VehiculoModal({ open, editing, onClose, onSaved }: VehiculoModalProps) {
  return (
    <Modal open={open} onClose={onClose} maxWidth={460}>
      <VehiculoForm editing={editing} onClose={onClose} onSaved={onSaved} />
    </Modal>
  );
}

function VehiculoForm({ editing, onClose, onSaved }: Omit<VehiculoModalProps, "open">) {
  const { user } = useAuth();
  const [form, setForm] = useState(() => ({
    marca: editing?.marca ?? "",
    modelo: editing?.modelo ?? "",
    anio: editing ? String(editing.anio) : "",
    placa: editing?.placa ?? "",
  }));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSave() {
    if (!user) return;
    if (!form.marca || !form.modelo || !form.placa || !form.anio) {
      setError("Completá marca, modelo, placa y año.");
      return;
    }
    setError("");
    setSaving(true);
    const payload = {
      placa: form.placa.trim(),
      marca: form.marca.trim(),
      modelo: form.modelo.trim(),
      anio: parseInt(form.anio, 10) || new Date().getFullYear(),
      idCliente: user.idCliente,
    };
    try {
      if (editing) {
        await updateVehiculo(editing.placa, payload);
      } else {
        await createVehiculo(payload);
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar el vehículo");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="px-7 pt-6 pb-7">
      <div className="flex justify-between items-center mb-5">
        <h2 className="display text-white text-[24px] m-0">{editing ? "EDITAR VEHÍCULO" : "NUEVO VEHÍCULO"}</h2>
        <IconButton icon={X} onClick={onClose} size={18} />
      </div>

      <div className="flex flex-col gap-3.5">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Marca" placeholder="Toyota" value={form.marca} onChange={set("marca")} />
          <Field label="Modelo" placeholder="Corolla" value={form.modelo} onChange={set("modelo")} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Año" type="number" placeholder="2021" value={form.anio} onChange={set("anio")} />
          <Field label="Placa" placeholder="ABC-123" value={form.placa} onChange={set("placa")} disabled={!!editing} />
        </div>

        {error && (
          <div className="flex gap-2 items-center text-[#ff5252] text-[13px]">
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        <Button variant="primary" size="lg" full icon={editing ? Check : Plus} onClick={handleSave} disabled={saving} className="mt-1.5">
          {saving ? "Guardando…" : editing ? "Guardar cambios" : "Agregar vehículo"}
        </Button>
      </div>
    </div>
  );
}
