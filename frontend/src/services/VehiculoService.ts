import type { Vehiculo } from "../models/responses/Vehiculo";
import { config } from "../config";

const API_URL = `${config.api.url}/api/vehiculo`;

export const getVehiculosByCliente = async (idCliente: number): Promise<Vehiculo[]> => {
  try {
    const response = await fetch(`${API_URL}/cliente/${idCliente}`);

    if (!response.ok) {
      throw new Error("No se pudieron obtener los vehículos");
    }

    return response.json() as Promise<Vehiculo[]>;
  } catch (error) {
    console.error("Error en vehiculoService:", error);
    throw error;
  }
};

export const getVehiculoByPlaca = async (placa: string): Promise<Vehiculo> => {
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(placa)}`);

    if (!response.ok) {
      throw new Error("No se encontró el vehículo");
    }

    return response.json() as Promise<Vehiculo>;
  } catch (error) {
    console.error("Error en vehiculoService:", error);
    throw error;
  }
};