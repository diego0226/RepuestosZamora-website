import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Cita } from "../models/responses/Cita";
import { getCitaById } from "../services/CitasService";

export function CitaDetail() {
  const { id } = useParams<{ id: string }>();
  const [cita, setCita] = useState<Cita | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    getCitaById(Number(id))
      .then((data) => setCita(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Error al cargar la cita"));
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!cita) return <p>Cargando...</p>;

  return (
    <div>
      <button onClick={() => navigate("/citas")}>← Volver</button>
      <h1>Detalle de la cita</h1>
      <p><strong>Fecha:</strong> {cita.fechaCita}</p>
      <p><strong>Servicio:</strong> {cita.nombreServicio}</p>
      <p><strong>Descripción:</strong> {cita.descripcionProblema}</p>
      <p><strong>Vehículo (placa):</strong> {cita.placa}</p>
      <p><strong>Estado:</strong> {cita.estadoCita}</p>
      <p><strong>Empleado:</strong> {cita.nombreEmpleado}</p>
    </div>
  );
}
