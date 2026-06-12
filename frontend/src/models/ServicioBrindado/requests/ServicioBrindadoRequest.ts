// Datos que el frontend envía para registrar un ítem del carrito como "servicio brindado"
// (POST /api/servicio-brindado). Coincide con ServicioBrindadoRequestModel del backend.
// Un ítem es un repuesto (idRepuesto + cantidadRepuestos) o un servicio (idServicio); siempre lleva idCliente.
export interface ServicioBrindadoRequest {
  idRepuesto?: number | null;
  cantidadRepuestos?: number | null;
  idServicio?: number | null;
  idCliente: number;
}
