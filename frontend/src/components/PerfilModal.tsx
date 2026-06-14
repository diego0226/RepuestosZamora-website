import { useState } from "react";
import { X, Check, AlertTriangle } from "lucide-react";
import { updatePerfil } from "../services/PerfilService";
import { useAuth } from "../contexts/AuthContext";
import { Modal } from "./ui/Modal";
import { Field } from "./ui/Field";
import { Button } from "./ui/Button";
import { IconButton } from "./ui/IconButton";

interface PerfilModalProps {
  open: boolean;
  onClose: () => void;
}

// Modal para editar los datos de contacto del perfil (correo y teléfono). El formulario se monta
// solo cuando el modal está abierto, así que su estado se inicializa directamente desde el usuario
// autenticado, sin efectos. Tras guardar, refresca el AuthUser en el contexto.
export function PerfilModal({ open, onClose }: PerfilModalProps) {
  return (
    <Modal open={open} onClose={onClose} maxWidth={460}>
      <PerfilForm onClose={onClose} />
    </Modal>
  );
}

function PerfilForm({ onClose }: Omit<PerfilModalProps, "open">) {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState(() => ({
    correo: user?.correo ?? "",
    telefono: user?.telefono ?? "",
  }));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSave() {
    if (!user) return;
    if (!form.correo.trim()) {
      setError("Ingresá un correo.");
      return;
    }
    setError("");
    setSaving(true);
    const payload = {
      correo: form.correo.trim(),
      telefono: form.telefono.trim(),
    };
    try {
      await updatePerfil(user.idCliente, payload);
      setUser({ ...user, ...payload });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar el perfil");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="px-7 pt-6 pb-7">
      <div className="flex justify-between items-center mb-5">
        <h2 className="display text-white text-[24px] m-0">EDITAR PERFIL</h2>
        <IconButton icon={X} onClick={onClose} size={18} />
      </div>

      <div className="flex flex-col gap-3.5">
        <Field label="Correo" type="email" placeholder="correo@ejemplo.com" value={form.correo} onChange={set("correo")} />
        <Field label="Teléfono" placeholder="8888-8888" value={form.telefono} onChange={set("telefono")} />

        {error && (
          <div className="flex gap-2 items-center text-[#ff5252] text-[13px]">
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        <Button variant="primary" size="lg" full icon={Check} onClick={handleSave} disabled={saving} className="mt-1.5">
          {saving ? "Guardando…" : "Guardar cambios"}
        </Button>
      </div>
    </div>
  );
}
