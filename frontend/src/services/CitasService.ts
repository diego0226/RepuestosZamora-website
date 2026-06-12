import type { Cita } from "../models/responses/Cita";
import { config } from "../config";

const API_URL = `${config.api.url}/api/citas`;

export async function getCitas(idCliente: number): Promise<Cita[]> {
  const response = await fetch(`${API_URL}/cliente/${idCliente}`);

  if (!response.ok) {
    throw new Error("Error al obtener las citas");
  }

  return await response.json();
}

export async function getCitaById(id: number): Promise<Cita> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener la cita");
  }

  return await response.json();
}
