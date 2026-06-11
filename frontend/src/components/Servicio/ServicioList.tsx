import { useEffect, useState } from "react";
import type { Servicio } from "../../models/Servicio/responses/Servicio";
import { getServices } from "../../services/Servicio/ServicionService";

export function ServicioList() {
  const [servicios, setServicios] = useState<Servicio[]>([]);

  useEffect(() => {
    getServices()
      .then((data) => {
        setServicios(data);
      })
      .catch((error) => {
        console.error("Error al obtener servicios:", error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de servicios</h1>
      {servicios.map((servicio, index) => (
        <div key={index}>
          <p><strong>Nombre:</strong> {servicio.nombreServicio}</p>
          <p><strong>Descripción:</strong> {servicio.descripcion}</p>
          <p><strong>Precio:</strong> {servicio.precio}</p>
        </div>
      ))}
    </div>
  );
}
