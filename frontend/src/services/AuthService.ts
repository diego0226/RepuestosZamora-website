// Importa la interfaz AuthUser para tipar la respuesta del servidor
import type { AuthUser } from "../models/responses/AuthUser";
// Importa la configuración con la URL base de la API
import { config } from "../config";

// URL base para los endpoints de autenticación del backend
const API_URL = `${config.api.url}/api/auth`;

// Función que envía las credenciales al backend para iniciar sesión
// Recibe el correo y la contraseña, y devuelve los datos completos del usuario autenticado
export async function login(correo: string, contrasena: string): Promise<AuthUser> {
  // Realiza la petición POST al endpoint de login con las credenciales en el cuerpo
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // Indica que el cuerpo de la petición es JSON
    body: JSON.stringify({ correo, contrasena }),     // Convierte las credenciales a formato JSON
  });

  // Si el servidor responde con 401 (no autorizado), lanza un error con mensaje claro para el usuario
  if (response.status === 401) {
    throw new Error("Correo o contraseña incorrectos");
  }

  // Si la respuesta no es exitosa por cualquier otro motivo, lanza un error genérico
  if (!response.ok) {
    throw new Error("Error al iniciar sesión");
  }

  // Convierte la respuesta JSON a un objeto AuthUser y lo retorna
  return await response.json();
}

// Interfaz que define los datos necesarios para registrar un nuevo cliente en el sistema
export interface RegisterData {
  nombre: string;     // Nombre del nuevo cliente
  apellido1: string;  // Primer apellido
  apellido2: string;  // Segundo apellido (puede estar vacío)
  correo: string;     // Correo electrónico (debe ser único en el sistema)
  contrasena: string; // Contraseña con mínimo 8 caracteres
  telefono: string;   // Número de teléfono (puede estar vacío)
}

// Función que envía los datos de registro al backend para crear un nuevo cliente
// Devuelve los datos del cliente recién creado si el registro fue exitoso
export async function register(data: RegisterData): Promise<AuthUser> {
  // Realiza la petición POST al endpoint de registro con todos los datos del nuevo cliente
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // Indica que el cuerpo de la petición es JSON
    body: JSON.stringify(data),                      // Convierte los datos de registro a formato JSON
  });

  // Si el servidor responde con 409 (conflicto), el correo ya está en uso por otro cliente
  if (response.status === 409) {
    throw new Error("El correo ya está registrado");
  }

  // Si la respuesta no es exitosa por cualquier otro motivo, lanza un error genérico
  if (!response.ok) {
    throw new Error("Error al registrar el cliente");
  }

  // Convierte la respuesta JSON al objeto AuthUser del cliente creado y lo retorna
  return await response.json();
}
