import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Vehiculo } from "../models/responses/Vehiculo";
import { getVehiculosByCliente } from "../services/VehiculoService";
import { useAuth } from "../contexts/AuthContext";

export function VehiculoList() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    getVehiculosByCliente(user.idCliente)
      .then((data) => setVehiculos(data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Error al cargar vehículos")
      );
  }, [user]);

  return (
    <div>
      <h1>Mis vehículos</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {vehiculos.length === 0 && !error ? (
        <p>No tenés vehículos registrados.</p>
      ) : (
        vehiculos.map((vehiculo) => (
          <div key={vehiculo.placa}>
            <p>{vehiculo.marca} {vehiculo.modelo} ({vehiculo.anio})</p>
            <p>Placa: {vehiculo.placa}</p>
            <button onClick={() => navigate(`/vehiculo/${vehiculo.placa}`)}>
              Ver detalle
            </button>
          </div>
        ))
      )}
    </div>
  );
}