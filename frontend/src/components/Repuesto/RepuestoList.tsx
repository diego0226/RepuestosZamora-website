import { useEffect, useState } from "react";
import type { Repuesto } from "../../models/Repuesto/responses/Repuesto";
import { getRepuestos } from "../../services/Repuesto/RepuestoService";

export function RepuestoList() {
  const [repuestos, setRepuestos] = useState<Repuesto[]>([]);

  useEffect(() => {
    getRepuestos()
      .then((data) => {
        setRepuestos(data);
      })
      .catch((error) => {
        console.error("Error al obtener repuestos:", error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de repuestos</h1>
      {repuestos.map((repuesto, index) => (
        <div key={index}>
          <p><strong>Nombre:</strong> {repuesto.nombre}</p>
          <p><strong>Descripción:</strong> {repuesto.descripcion}</p>
          <p><strong>Precio:</strong> {repuesto.precio}</p>
          <p><strong>Stock:</strong> {repuesto.stock}</p>
        </div>
      ))}
    </div>
  );
}
