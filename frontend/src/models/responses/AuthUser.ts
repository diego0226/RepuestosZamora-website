// Interfaz que define la estructura de los datos del usuario autenticado
// Estos datos se reciben del backend al hacer login o registro y se guardan en el contexto de autenticación
export interface AuthUser {
  idCliente: number;       // Identificador único del cliente en la base de datos
  nombre: string;          // Nombre del cliente
  apellido1: string;       // Primer apellido del cliente
  apellido2: string;       // Segundo apellido del cliente
  correo: string;          // Correo electrónico del cliente
  telefono: string;        // Número de teléfono del cliente
  fecha_registro: string;  // Fecha de registro en formato string ISO (ej: "2024-01-15")
}
