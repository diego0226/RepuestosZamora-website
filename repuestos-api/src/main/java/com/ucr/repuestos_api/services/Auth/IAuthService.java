package com.ucr.repuestos_api.services.Auth;

import com.ucr.repuestos_api.dtos.Cliente.ClienteRequestDto; // DTO con los datos para registrar un cliente
import com.ucr.repuestos_api.entities.Cliente.Cliente;        // Entidad JPA del cliente

// Interfaz del servicio de autenticación. Define las operaciones de negocio relacionadas con
// el inicio de sesión y el registro de clientes, sin exponer su implementación concreta.
public interface IAuthService {

    // Valida las credenciales recibidas y devuelve el cliente correspondiente si son correctas
    Cliente login(String correo, String contrasena);

    // Registra un nuevo cliente a partir de los datos recibidos y devuelve la entidad creada
    Cliente register(ClienteRequestDto clienteRequestDto);
}
