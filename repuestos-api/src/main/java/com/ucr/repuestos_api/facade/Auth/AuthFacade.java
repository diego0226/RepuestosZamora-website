package com.ucr.repuestos_api.facade.Auth;

import org.springframework.beans.factory.annotation.Autowired; // Inyección de dependencias
import org.springframework.stereotype.Component;                // Marca la clase como componente de Spring

import com.ucr.repuestos_api.dtos.Auth.AuthResponseDto;     // DTO de respuesta con los datos del cliente
import com.ucr.repuestos_api.dtos.Cliente.ClienteRequestDto; // DTO con los datos para registrar un cliente
import com.ucr.repuestos_api.mappers.Auth.AuthMapper;        // Mapper que convierte entidad -> DTO
import com.ucr.repuestos_api.services.Auth.IAuthService;     // Servicio con la lógica de negocio de autenticación

import jakarta.transaction.Transactional; // Permite marcar operaciones como transaccionales

// Implementación de la fachada de autenticación. Coordina el servicio (lógica de negocio)
// y el mapper (conversión de datos), igual que ClienteFacade hace con su servicio y mapper.
@Component
public class AuthFacade implements IAuthFacade {

    // Inyección del servicio de autenticación que contiene la lógica de login y registro
    @Autowired
    private IAuthService authService;

    // Inyección del mapper para convertir la entidad Cliente en un DTO de respuesta
    @Autowired
    private AuthMapper authMapper;

    @Override
    public AuthResponseDto login(String correo, String contrasena) {
        // Delega la validación de credenciales al servicio y obtiene la entidad cliente
        var cliente = authService.login(correo, contrasena);
        // Convierte la entidad en un DTO de respuesta y lo retorna
        return authMapper.toAuthResponseDto(cliente);
    }

    @Override
    @Transactional // El registro modifica la base de datos, por lo que se ejecuta dentro de una transacción
    public AuthResponseDto register(ClienteRequestDto clienteRequestDto) {
        // Delega la creación del cliente al servicio y obtiene la entidad recién guardada
        var cliente = authService.register(clienteRequestDto);
        // Convierte la entidad en un DTO de respuesta y lo retorna
        return authMapper.toAuthResponseDto(cliente);
    }
}
