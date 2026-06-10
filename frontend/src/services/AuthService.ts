import type { AuthUser } from "../models/responses/AuthUser";
import { config } from "../config";

const API_URL = `${config.api.url}/api/auth`;

export async function login(correo: string, contrasena: string): Promise<AuthUser> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });

  if (response.status === 401) {
    throw new Error("Correo o contraseña incorrectos");
  }

  if (!response.ok) {
    throw new Error("Error al iniciar sesión");
  }

  return await response.json();
}
