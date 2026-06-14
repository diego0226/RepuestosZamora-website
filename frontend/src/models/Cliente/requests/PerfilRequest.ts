// Datos que el frontend envía para editar el perfil del cliente (PUT /api/cliente/{id}/perfil).
// Coincide con ClientePerfilRequestModel del backend: solo correo y teléfono, sin contraseña.
export interface PerfilRequest {
  correo: string;
  telefono: string;
}
