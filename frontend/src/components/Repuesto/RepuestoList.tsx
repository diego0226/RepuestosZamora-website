import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Package, ShoppingCart } from "lucide-react";
import type { Repuesto } from "../../models/Repuesto/responses/Repuesto";
import { getRepuestos } from "../../services/Repuesto/RepuestoService";
import { useCart } from "../../contexts/CartContext";
import { SectionTitle } from "../ui/SectionTitle";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { EmptyState } from "../ui/EmptyState";
import { PartImage } from "../ui/PartImage";
import { ViewIn } from "../ui/ViewIn";
import { iconParaRepuesto } from "../ui/icons";
import { colones } from "../ui/format";

export function RepuestoList() {
  const navigate = useNavigate();
  const { addRepuesto } = useCart();
  const [repuestos, setRepuestos] = useState<Repuesto[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    getRepuestos()
      .then(setRepuestos)
      .catch((error) => console.error("Error al obtener repuestos:", error));
  }, []);

  const list = repuestos.filter((r) => r.nombre.toLowerCase().includes(q.toLowerCase()));

  return (
    <ViewIn>
      <SectionTitle kicker="Catálogo de partes" title="REPUESTOS" />

      <div className="flex gap-3 mb-[18px] flex-wrap items-center">
        <div className="relative flex-1 max-w-[340px]" style={{ flexBasis: "240px" }}>
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary"><Search size={17} /></span>
          <input
            className="field w-full rounded text-sm pl-10 pr-3.5 py-[11px]"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar repuesto…"
          />
        </div>
      </div>

      <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px,1fr))" }}>
        {list.map((r, i) => {
          const Icon = iconParaRepuesto(r.nombre);
          return (
            <motion.div
              key={r.idRepuesto}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: i * 0.045, ease: [0.16, 1, 0.3, 1] }}
              className="surface surface-hover rounded-[10px] overflow-hidden flex flex-col"
            >
              <button onClick={() => navigate(`/repuestos/${r.idRepuesto}`)} className="border-0 p-0 bg-transparent cursor-pointer block">
                <PartImage icon={Icon} />
              </button>
              <div className="p-[18px] flex flex-col flex-1">
                <div className="flex justify-between gap-2">
                  <span className="mono text-[10.5px] text-secondary uppercase" style={{ letterSpacing: "0.08em" }}>RZ-{r.idRepuesto}</span>
                  {r.stock <= 10 && <Badge tone="amber">Poco stock</Badge>}
                </div>
                <button
                  onClick={() => navigate(`/repuestos/${r.idRepuesto}`)}
                  className="text-left border-0 bg-transparent p-0 cursor-pointer text-white font-bold text-[15.5px] mt-2 leading-tight"
                >
                  {r.nombre}
                </button>
                <div className="flex-1" />
                <div className="flex justify-between items-center mt-4">
                  <span className="mono text-primary font-extrabold text-[18px]">{colones(r.precio)}</span>
                </div>
                <Button variant="primary" size="sm" full icon={ShoppingCart} onClick={() => addRepuesto(r)} className="mt-3">Añadir</Button>
              </div>
            </motion.div>
          );
        })}
        {list.length === 0 && <EmptyState icon={Package} text="No encontramos repuestos con ese criterio." />}
      </div>
    </ViewIn>
  );
}
