package com.ucr.repuestos_api.facade.Auth;

import com.ucr.repuestos_api.dtos.Auth.AuthResponseDto;     // DTO de respuesta con los datos del cliente autenticado
import com.ucr.repuestos_api.dtos.Cliente.ClienteRequestDto; // DTO con los datos para registrar un cliente

// Interfaz de la fachada (facade) de autenticación. Define el punto de entrada de alto nivel
// que usa el controlador, orquestando el servicio y el mapper para login y registro.
public interface IAuthFacade {

    // Inicia sesión validando las credenciales y devuelve los datos del cliente como DTO
    AuthResponseDto login(String correo, String contrasena);

    // Registra un nuevo cliente y devuelve sus datos como DTO
    AuthResponseDto register(ClienteRequestDto clienteRequestDto);
}
