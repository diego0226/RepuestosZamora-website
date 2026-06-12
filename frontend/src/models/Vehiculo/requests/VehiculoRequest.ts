// Datos que el frontend envía para crear o actualizar un vehículo (POST/PUT /api/vehiculo).
// Coincide con VehiculoRequestModel del backend.
export interface VehiculoRequest {
  placa: string;
  marca: string;
  modelo: string;
  anio: number;
  idCliente: number;
}
