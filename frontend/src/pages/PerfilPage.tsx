import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Calendar, LogOut, Pencil } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Button } from "../components/ui/Button";
import { ViewIn } from "../components/ui/ViewIn";
import { fechaLegible } from "../components/ui/format";
import { PerfilModal } from "../components/PerfilModal";

export function PerfilPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);

  if (!user) {
    return <p className="text-secondary">No hay información del usuario disponible.</p>;
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const datos: [string, string, typeof User][] = [
    ["Nombre completo", `${user.nombre} ${user.apellido1} ${user.apellido2 ?? ""}`.trim(), User],
    ["Correo", user.correo, Mail],
    ["Teléfono", user.telefono || "No registrado", Phone],
    ["Miembro desde", user.fecha_registro ? fechaLegible(user.fecha_registro) : "No disponible", Calendar],
  ];

  return (
    <ViewIn className="max-w-[760px]">
      <SectionTitle kicker="Tu cuenta" title="MI PERFIL" />

      <div className="surface rounded-xl overflow-hidden">
        <div className="tex-carbon flex gap-5 items-center px-7 py-7" style={{ background: "#1a1a1a", borderBottom: "1px solid var(--line)" }}>
          <div className="corner-cut w-[76px] h-[76px] rounded-xl grid place-items-center shrink-0 bg-primary">
            <span className="display text-white text-[32px]">{user.nombre[0]}{user.apellido1[0]}</span>
          </div>
          <div>
            <div className="display text-white text-[26px]">{user.nombre} {user.apellido1}</div>
            <div className="mono text-[12.5px] text-secondary mt-1">Cliente #{user.idCliente}</div>
          </div>
          <Button variant="ghost" icon={Pencil} onClick={() => setEditando(true)} className="ml-auto">Editar perfil</Button>
        </div>

        <div className="p-7">
          <div className="mono text-[11px] text-secondary uppercase font-bold mb-5" style={{ letterSpacing: "0.2em" }}>
            Datos personales
          </div>

          <div className="grid gap-0" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))" }}>
            {datos.map(([k, v, Icon]) => (
              <div key={k} className="flex gap-3 items-center py-3.5" style={{ borderBottom: "1px solid var(--line)" }}>
                <Icon size={18} style={{ color: "var(--primary)" }} className="shrink-0" />
                <div>
                  <div className="mono text-[10.5px] text-secondary uppercase" style={{ letterSpacing: "0.08em" }}>{k}</div>
                  <div className="text-white text-[14.5px] font-semibold mt-0.5">{v}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[26px] pt-[22px] flex justify-between items-center gap-3.5 flex-wrap" style={{ borderTop: "1px solid var(--line)" }}>
            <div>
              <div className="font-bold text-white text-[15px]">Cerrar sesión</div>
              <div className="text-secondary text-[13px] mt-0.5">Volvés a la página de inicio.</div>
            </div>
            <Button variant="outlineRed" icon={LogOut} onClick={handleLogout}>Cerrar sesión</Button>
          </div>
        </div>
      </div>

      <PerfilModal open={editando} onClose={() => setEditando(false)} />
    </ViewIn>
  );
}
