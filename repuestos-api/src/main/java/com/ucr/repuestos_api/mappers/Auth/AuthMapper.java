package com.ucr.repuestos_api.mappers.Auth;

import org.springframework.stereotype.Component; // Marca la clase como componente gestionado por Spring

import com.ucr.repuestos_api.dtos.Auth.AuthResponseDto;     // DTO interno con los datos del cliente autenticado
import com.ucr.repuestos_api.entities.Cliente.Cliente;       // Entidad JPA del cliente
import com.ucr.repuestos_api.models.Auth.AuthResponseModel;  // Modelo de la capa web que se devuelve al frontend

// Mapper encargado de transformar entre las distintas representaciones de los datos de autenticación.
// Sigue el mismo patrón que ClienteMapper: convierte Entidad -> DTO -> Modelo.
@Component
public class AuthMapper {

    // Convierte una entidad Cliente (proveniente de la base de datos) en un AuthResponseDto interno
    public AuthResponseDto toAuthResponseDto(Cliente cliente) {
        return new AuthResponseDto(
                cliente.getIdCliente(),       // ID generado por la base de datos
                cliente.getNombre(),          // Nombre
                cliente.getApellido1(),       // Primer apellido
                cliente.getApellido2(),       // Segundo apellido
                cliente.getCorreo(),          // Correo electrónico
                cliente.getTelefono(),        // Teléfono
                cliente.getFecha_registro()); // Fecha de registro
    }

    // Convierte el AuthResponseDto interno en el AuthResponseModel que se envía como respuesta JSON al frontend
    public AuthResponseModel toAuthResponseModel(AuthResponseDto dto) {
        return new AuthResponseModel(
                dto.idCliente(),       // ID del cliente
                dto.nombre(),          // Nombre
                dto.apellido1(),       // Primer apellido
                dto.apellido2(),       // Segundo apellido
                dto.correo(),          // Correo electrónico
                dto.telefono(),        // Teléfono
                dto.fecha_registro()); // Fecha de registro
    }
}
