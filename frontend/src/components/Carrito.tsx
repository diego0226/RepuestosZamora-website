import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Package, Wrench, Trash2, Minus, Plus, Check, AlertTriangle } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { addServicioBrindado } from "../services/ServicioBrindado/ServicioBrindadoService";
import { SectionTitle } from "./ui/SectionTitle";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { IconButton } from "./ui/IconButton";
import { ViewIn } from "./ui/ViewIn";
import { iconParaRepuesto, iconParaServicio } from "./ui/icons";
import { colones } from "./ui/format";

export function Carrito() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, subtotal, setCantidad, remove, clear } = useCart();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const iva = Math.round(subtotal * 0.13);
  const total = subtotal + iva;

  // Registra cada ítem del carrito como un servicio brindado del cliente.
  async function handleCheckout() {
    if (!user || items.length === 0) return;
    setError("");
    setSaving(true);
    try {
      for (const item of items) {
        if (item.tipo === "repuesto") {
          await addServicioBrindado({ idRepuesto: item.id, cantidadRepuestos: item.cantidad, idCliente: user.idCliente });
        } else {
          await addServicioBrindado({ idServicio: item.id, idCliente: user.idCliente });
        }
      }
      clear();
      setOk(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo procesar la orden");
    } finally {
      setSaving(false);
    }
  }

  if (ok) {
    return (
      <ViewIn>
        <SectionTitle kicker="Tu orden" title="CARRITO" />
        <div className="surface rounded-xl py-16 px-6 text-center">
          <div className="w-[72px] h-[72px] rounded-full grid place-items-center mx-auto text-primary" style={{ background: "rgba(230,0,0,0.12)" }}>
            <Check size={34} />
          </div>
          <div className="display text-white text-[22px] mt-[18px]">¡ORDEN REGISTRADA!</div>
          <div className="text-secondary text-sm mt-2">Tus repuestos y servicios quedaron registrados. El taller te contactará.</div>
          <div className="flex gap-3 justify-center mt-[26px] flex-wrap">
            <Button variant="primary" icon={Package} onClick={() => navigate("/repuestos")}>Ver repuestos</Button>
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>Ir al panel</Button>
          </div>
        </div>
      </ViewIn>
    );
  }

  if (items.length === 0) {
    return (
      <ViewIn>
        <SectionTitle kicker="Tu orden" title="CARRITO" />
        <div className="surface rounded-xl py-16 px-6 text-center">
          <div className="w-[72px] h-[72px] rounded-full grid place-items-center mx-auto text-secondary" style={{ border: "1px solid var(--line-strong)" }}>
            <ShoppingCart size={34} />
          </div>
          <div className="display text-white text-[22px] mt-[18px]">TU CARRITO ESTÁ VACÍO</div>
          <div className="text-secondary text-sm mt-2">Agregá repuestos o servicios para armar tu orden.</div>
          <div className="flex gap-3 justify-center mt-[26px] flex-wrap">
            <Button variant="primary" icon={Package} onClick={() => navigate("/repuestos")}>Ver repuestos</Button>
            <Button variant="ghost" icon={Wrench} onClick={() => navigate("/servicios")}>Ver servicios</Button>
          </div>
        </div>
      </ViewIn>
    );
  }

  return (
    <ViewIn>
      <SectionTitle
        kicker="Tu orden"
        title="CARRITO"
        action={<Button variant="outlineRed" icon={Trash2} onClick={clear}>Vaciar</Button>}
      />

      <div className="grid gap-[18px] lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3">
          {items.map((item) => {
            const Icon = item.tipo === "repuesto" ? iconParaRepuesto(item.nombre) : iconParaServicio(item.nombre);
            return (
              <div key={item.key} className="surface rounded-lg p-4 flex gap-4 items-center">
                <div className="w-14 h-14 rounded-lg grid place-items-center shrink-0 text-primary" style={{ background: "rgba(230,0,0,0.1)" }}>
                  <Icon size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-[15px] leading-tight">{item.nombre}</div>
                  <div className="flex gap-2.5 items-center flex-wrap mt-[7px]">
                    <Badge tone="gray">{item.tipo === "servicio" ? "Servicio" : "Repuesto"}</Badge>
                    <span className="mono text-secondary text-[13px]">{colones(item.precio)} c/u</span>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  {item.tipo === "servicio" ? (
                    <span className="mono text-secondary text-[12px] w-20 text-center">1 servicio</span>
                  ) : (
                    <div className="flex items-center rounded overflow-hidden" style={{ border: "1px solid var(--line-strong)" }}>
                      <button onClick={() => setCantidad(item.key, -1)} className="w-[34px] h-[38px] bg-transparent border-0 text-white cursor-pointer grid place-items-center"><Minus size={14} /></button>
                      <span className="mono w-8 text-center text-white font-bold">{item.cantidad}</span>
                      <button onClick={() => setCantidad(item.key, 1)} className="w-[34px] h-[38px] bg-transparent border-0 text-white cursor-pointer grid place-items-center"><Plus size={14} /></button>
                    </div>
                  )}
                  <span className="mono text-white font-bold text-[15px] w-[92px] text-right">{colones(item.precio * item.cantidad)}</span>
                  <IconButton icon={Trash2} size={16} onClick={() => remove(item.key)} title="Quitar" className="!w-9 !h-9" style={{ color: "var(--secondary)" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumen */}
        <div className="surface rounded-[10px] p-6 self-start sticky top-[88px]">
          <div className="mono text-[11px] text-secondary uppercase font-bold mb-[18px]" style={{ letterSpacing: "0.2em" }}>Resumen</div>
          {([["Subtotal", subtotal], ["IVA (13%)", iva]] as [string, number][]).map(([k, v]) => (
            <div key={k} className="flex justify-between py-2.5 text-secondary text-sm">
              <span>{k}</span>
              <span className="mono text-white">{colones(v)}</span>
            </div>
          ))}
          <div className="mt-2.5 pt-4 flex justify-between items-baseline" style={{ borderTop: "1px solid var(--line)" }}>
            <span className="font-bold text-white text-[15px]">Total</span>
            <span className="mono text-primary font-extrabold text-[26px]">{colones(total)}</span>
          </div>

          {error && (
            <div className="flex gap-2 items-center text-[#ff5252] text-[13px] mt-3">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          <Button variant="primary" size="lg" full icon={Check} onClick={handleCheckout} disabled={saving} className="mt-5">
            {saving ? "Procesando…" : "Proceder al pago"}
          </Button>
          <Button variant="ghost" full onClick={() => navigate("/repuestos")} className="mt-2.5">Seguir comprando</Button>
        </div>
      </div>
    </ViewIn>
  );
}
