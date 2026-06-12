package com.ucr.repuestos_api.models.Auth;

import java.time.LocalDate; // Tipo para representar la fecha de registro del cliente

// Modelo de la capa web que define la respuesta enviada al frontend tras autenticarse.
// Es el objeto que finalmente se serializa a JSON en las respuestas de login y registro.
public record AuthResponseModel(
        Integer idCliente,        // Identificador único del cliente
        String nombre,            // Nombre del cliente
        String apellido1,         // Primer apellido
        String apellido2,         // Segundo apellido (puede ser null)
        String correo,            // Correo electrónico
        String telefono,          // Teléfono (puede ser null)
        LocalDate fecha_registro  // Fecha en que el cliente se registró
) {
}
