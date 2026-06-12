package com.ucr.repuestos_api.dtos.Auth;

import java.time.LocalDate; // Importa LocalDate para representar la fecha de registro del cliente

// DTO (Data Transfer Object) que define los datos que se envían al cliente después de autenticarse
// Se usa tanto en login como en registro para devolver la información completa del cliente
public record AuthResponseDto(
        Integer idCliente,        // Identificador único del cliente generado por la base de datos
        String nombre,            // Nombre del cliente
        String apellido1,         // Primer apellido del cliente
        String apellido2,         // Segundo apellido del cliente (puede ser null)
        String correo,            // Correo electrónico del cliente
        String telefono,          // Número de teléfono del cliente (puede ser null)
        LocalDate fecha_registro  // Fecha en que el cliente se registró en el sistema
) {
}
