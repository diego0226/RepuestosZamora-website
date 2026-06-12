import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import type { Repuesto } from "../../models/Repuesto/responses/Repuesto";
import { getRepuestoById } from "../../services/Repuesto/RepuestoService";
import { useCart } from "../../contexts/CartContext";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { PartImage } from "../ui/PartImage";
import { ViewIn } from "../ui/ViewIn";
import { iconParaRepuesto } from "../ui/icons";
import { colones } from "../ui/format";

export function RepuestoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addRepuesto } = useCart();
  const [r, setR] = useState<Repuesto | null>(null);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!id) return;
    getRepuestoById(Number(id))
      .then(setR)
      .catch((err) => setError(err instanceof Error ? err.message : "Error al cargar el repuesto"));
  }, [id]);

  if (error) return <p className="text-[#ff5252]">{error}</p>;
  if (!r) return <p className="text-secondary">Cargando…</p>;

  const Icon = iconParaRepuesto(r.nombre);

  function handleAdd() {
    if (!r) return;
    addRepuesto(r, qty);
    navigate("/carrito");
  }

  return (
    <ViewIn>
      <button
        onClick={() => navigate("/repuestos")}
        className="mono inline-flex items-center gap-2 bg-transparent border-0 text-secondary cursor-pointer text-[12px] uppercase mb-[18px] font-bold"
        style={{ letterSpacing: "0.1em" }}
      >
        <ArrowLeft size={16} /> Volver al catálogo
      </button>

      <div className="grid gap-[22px] lg:grid-cols-2">
        <div className="surface rounded-xl overflow-hidden">
          <PartImage icon={Icon} height={320} big />
        </div>
        <div>
          <Badge tone="gray">Código RZ-{r.idRepuesto}</Badge>
          <h1 className="display text-white text-[34px] mt-3.5">{r.nombre}</h1>
          <div className="mono text-primary font-extrabold text-[30px] mt-4">{colones(r.precio)}</div>
          <p className="text-secondary text-[15px] leading-relaxed mt-4">{r.descripcion}</p>

          <div className="flex gap-[18px] mt-5 flex-wrap">
            <div>
              <div className="mono text-[10.5px] text-secondary uppercase" style={{ letterSpacing: "0.08em" }}>En existencia</div>
              <div className="font-bold text-base mt-[3px]" style={{ color: r.stock <= 10 ? "#ff7a3c" : "#fff" }}>{r.stock} unidades</div>
            </div>
            <div>
              <div className="mono text-[10.5px] text-secondary uppercase" style={{ letterSpacing: "0.08em" }}>Código</div>
              <div className="mono text-white font-bold text-base mt-[3px]">RZ-{r.idRepuesto}</div>
            </div>
          </div>

          <div className="flex gap-3 mt-7 items-center">
            <div className="flex items-center rounded overflow-hidden" style={{ border: "1px solid var(--line-strong)" }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-[42px] h-[46px] bg-transparent border-0 text-white cursor-pointer grid place-items-center">
                <Minus size={16} />
              </button>
              <span className="mono w-11 text-center text-white font-bold text-base">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(r.stock, q + 1))} className="w-[42px] h-[46px] bg-transparent border-0 text-white cursor-pointer grid place-items-center">
                <Plus size={16} />
              </button>
            </div>
            <Button variant="primary" size="lg" icon={ShoppingCart} onClick={handleAdd} className="flex-1">
              Añadir al carrito · {colones(r.precio * qty)}
            </Button>
          </div>
        </div>
      </div>
    </ViewIn>
  );
}
