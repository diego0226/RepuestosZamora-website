// Estructura de un servicio del taller tal como lo devuelve GET /api/servicio.
// idServicio es necesario para agendar citas y para registrar el servicio en el carrito (servicio brindado).
export interface Servicio {
  idServicio: number;
  nombreServicio: string;
  descripcion: string;
  precio: number;
}
