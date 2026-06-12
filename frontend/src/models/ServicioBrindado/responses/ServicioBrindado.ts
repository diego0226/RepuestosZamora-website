// Estructura de un servicio brindado tal como lo devuelve GET /api/servicio-brindado/cliente/{idCliente}.
// Coincide con ServicioBrindadoResponseModel del backend.
export interface ServicioBrindado {
  nombreRepuesto: string | null;
  cantidadRepuestos: number | null;
  nombreServicio: string | null;
  nombreCliente: string;
}
