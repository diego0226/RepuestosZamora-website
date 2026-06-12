// Datos que el frontend envía al backend para agendar una nueva cita (POST /api/citas).
// Coincide con CitaRequestModel del backend.
export interface CitaRequest {
  fechaCita: string;          // Fecha y hora en formato ISO LocalDateTime (ej: "2026-07-01T09:30:00")
  descripcionProblema: string;
  idCliente: number;
  idServicio: number;
  placa: string;
}
