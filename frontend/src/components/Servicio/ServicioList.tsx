import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Wrench } from "lucide-react";
import type { Servicio } from "../../models/Servicio/responses/Servicio";
import { getServices } from "../../services/Servicio/ServicionService";
import { useCart } from "../../contexts/CartContext";
import { SectionTitle } from "../ui/SectionTitle";
import { Button } from "../ui/Button";
import { EmptyState } from "../ui/EmptyState";
import { ViewIn } from "../ui/ViewIn";
import { iconParaServicio } from "../ui/icons";
import { colones } from "../ui/format";

export function ServicioList() {
  const { addServicio } = useCart();
  const [servicios, setServicios] = useState<Servicio[]>([]);

  useEffect(() => {
    getServices()
      .then(setServicios)
      .catch((error) => console.error("Error al obtener servicios:", error));
  }, []);

  return (
    <ViewIn>
      <SectionTitle kicker="Mano de obra" title="SERVICIOS" />

      <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(290px,1fr))" }}>
        {servicios.map((s, i) => {
          const Icon = iconParaServicio(s.nombreServicio);
          return (
            <motion.div
              key={s.idServicio}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="surface surface-hover rounded-[10px] p-[22px] flex flex-col"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-lg grid place-items-center text-primary" style={{ background: "rgba(230,0,0,0.1)" }}>
                  <Icon size={26} />
                </div>
              </div>
              <div className="font-bold text-white text-[17px] mt-4">{s.nombreServicio}</div>
              <div className="text-secondary text-[13.5px] leading-relaxed mt-[7px] flex-1">{s.descripcion}</div>
              <div className="flex justify-between items-center mt-[18px] gap-2.5">
                <span className="mono text-primary font-extrabold text-[20px]">{colones(s.precio)}</span>
                <Button variant="primary" size="sm" icon={ShoppingCart} onClick={() => addServicio(s)}>Añadir</Button>
              </div>
            </motion.div>
          );
        })}
        {servicios.length === 0 && <EmptyState icon={Wrench} text="No hay servicios disponibles por ahora." />}
      </div>
    </ViewIn>
  );
}
