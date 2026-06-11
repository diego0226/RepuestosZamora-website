import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Vehiculo } from "../models/responses/Vehiculo";
import { getVehiculoByPlaca } from "../services/VehiculoService";

export function VehiculoDetail() {
  const { placa } = useParams<{ placa: string }>();
  const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!placa) return;

    getVehiculoByPlaca(placa)
      .then((data) => setVehiculo(data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Error al cargar el vehículo")
      );
  }, [placa]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!vehiculo) return <p>Cargando...</p>;

  return (
    <div>
      <button onClick={() => navigate("/vehiculo")}>← Volver</button>
      <h1>Detalle del vehículo</h1>
      <p><strong>Placa:</strong> {vehiculo.placa}</p>
      <p><strong>Marca:</strong> {vehiculo.marca}</p>
      <p><strong>Modelo:</strong> {vehiculo.modelo}</p>
      <p><strong>Año:</strong> {vehiculo.anio}</p>
    </div>
  );
}
