import type { Vehiculo } from "../models/responses/Vehiculo";
import type { VehiculoRequest } from "../models/Vehiculo/requests/VehiculoRequest";
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

// Crea un nuevo vehículo para el cliente (POST /api/vehiculo)
export const createVehiculo = async (data: VehiculoRequest): Promise<Vehiculo> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("No se pudo crear el vehículo");
    }

    return response.json() as Promise<Vehiculo>;
  } catch (error) {
    console.error("Error en vehiculoService:", error);
    throw error;
  }
};

// Actualiza un vehículo existente identificado por su placa (PUT /api/vehiculo/{placa})
export const updateVehiculo = async (placa: string, data: VehiculoRequest): Promise<Vehiculo> => {
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(placa)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("No se pudo actualizar el vehículo");
    }

    return response.json() as Promise<Vehiculo>;
  } catch (error) {
    console.error("Error en vehiculoService:", error);
    throw error;
  }
};

// Elimina un vehículo por su placa (DELETE /api/vehiculo/{placa})
export const deleteVehiculo = async (placa: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(placa)}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("No se pudo eliminar el vehículo");
    }
  } catch (error) {
    console.error("Error en vehiculoService:", error);
    throw error;
  }
};
