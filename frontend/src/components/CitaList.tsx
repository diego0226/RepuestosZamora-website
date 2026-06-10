import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Cita } from "../models/responses/Cita";
import { getCitas } from "../services/CitasService";
import { useAuth } from "../contexts/AuthContext";

export function CitaList() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [error, setError] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    getCitas(user.idCliente)
      .then((data) => setCitas(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Error al cargar citas"));
  }, [user]);

  function handleVerDetalle(id: number) {
    navigate(`/citas/${id}`);
  }

  return (
    <div>
      <div>
        <h1>Mis citas</h1>
        <button onClick={logout}>Cerrar sesión</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {citas.length === 0 && !error && <p>No tenés citas registradas.</p>}

      {citas.map((cita) => (
        <div key={cita.id}>
          <p>{cita.fechaCita}</p>
          <p>{cita.nombreServicio}</p>
          <p>{cita.estadoCita}</p>
          <button onClick={() => handleVerDetalle(cita.id)}>Ver detalle</button>
        </div>
      ))}
    </div>
  );
}
