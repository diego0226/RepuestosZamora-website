import type { PerfilRequest } from "../models/Cliente/requests/PerfilRequest";
import { config } from "../config";

const API_URL = `${config.api.url}/api/cliente`;

// Actualiza el perfil del cliente (correo y teléfono) identificado por su id (PUT /api/cliente/{id}/perfil)
export const updatePerfil = async (idCliente: number, data: PerfilRequest): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${idCliente}/perfil`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.status === 409) {
      throw new Error("El correo ya está registrado");
    }

    if (!response.ok) {
      throw new Error("No se pudo actualizar el perfil");
    }
  } catch (error) {
    console.error("Error en PerfilService:", error);
    throw error;
  }
};
