import type { Servicio } from "../../models/Servicio/responses/Servicio";
import { config } from "../../config";

const API_URL = `${config.api.url}/api/servicio`;

export async function getServices(): Promise<Servicio[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener los servicios");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en serviceService:", error);
    throw error;
  }
}
