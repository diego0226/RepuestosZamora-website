import type { Repuesto } from "../../models/Repuesto/responses/Repuesto";
import { config } from "../../config";

const API_URL = `${config.api.url}/api/repuesto`;

export async function getRepuestos(): Promise<Repuesto[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener los repuestos");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en repuestoService:", error);
    throw error;
  }
}
