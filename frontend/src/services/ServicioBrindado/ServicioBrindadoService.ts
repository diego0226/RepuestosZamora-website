import type { ServicioBrindado } from "../../models/ServicioBrindado/responses/ServicioBrindado";
import type { ServicioBrindadoRequest } from "../../models/ServicioBrindado/requests/ServicioBrindadoRequest";
import { config } from "../../config";

// URL base de los endpoints de servicio brindado (carrito persistido) del backend
const API_URL = `${config.api.url}/api/servicio-brindado`;

// Obtiene todos los servicios brindados (ítems registrados) de un cliente
export async function getServiciosBrindadosByCliente(idCliente: number): Promise<ServicioBrindado[]> {
  try {
    const response = await fetch(`${API_URL}/cliente/${idCliente}`);

    if (!response.ok) {
      throw new Error("Error al obtener los servicios brindados");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en servicioBrindadoService:", error);
    throw error;
  }
}

// Registra un ítem del carrito (repuesto o servicio) como servicio brindado del cliente
export async function addServicioBrindado(data: ServicioBrindadoRequest): Promise<void> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al registrar el servicio brindado");
    }
  } catch (error) {
    console.error("Error en servicioBrindadoService:", error);
    throw error;
  }
}

// Elimina un servicio brindado por su identificador
export async function removeServicioBrindado(idServicioBrindado: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${idServicioBrindado}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el servicio brindado");
    }
  } catch (error) {
    console.error("Error en servicioBrindadoService:", error);
    throw error;
  }
}
