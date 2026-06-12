package com.ucr.repuestos_api.services.Auth;

import java.time.LocalDate; // Para asignar la fecha actual como fecha de registro

import org.springframework.beans.factory.annotation.Autowired; // Inyección de dependencias
import org.springframework.stereotype.Service;                  // Marca la clase como servicio de Spring

import com.ucr.repuestos_api.Exceptions.EmailAlreadyExistsException; // Excepción para correo duplicado
import com.ucr.repuestos_api.Exceptions.InvalidCredentialsException; // Excepción para credenciales inválidas
import com.ucr.repuestos_api.dtos.Cliente.ClienteRequestDto;          // DTO con los datos del cliente a registrar
import com.ucr.repuestos_api.entities.Cliente.Cliente;                // Entidad JPA del cliente
import com.ucr.repuestos_api.repositories.Cliente.ClienteRepository;  // Repositorio reutilizado (Auth opera sobre Cliente)

// Implementación del servicio de autenticación. Contiene la lógica de negocio del login y el registro.
// Reutiliza ClienteRepository porque la autenticación opera sobre la entidad Cliente y no tiene tabla propia.
@Service
public class AuthService implements IAuthService {

    // Inyección del repositorio de clientes para consultar y guardar datos en la base de datos
    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public Cliente login(String correo, String contrasena) {
        // Busca al cliente por su correo; si no existe, lanza excepción de credenciales inválidas
        var cliente = clienteRepository.findByCorreo(correo)
                .orElseThrow(() -> new InvalidCredentialsException("Correo o contraseña incorrectos"));

        // Compara la contraseña almacenada con la recibida; si no coinciden, lanza la misma excepción
        // (se usa el mismo mensaje genérico por seguridad, para no revelar si el correo existe o no)
        if (!cliente.getContrasena().equals(contrasena)) {
            throw new InvalidCredentialsException("Correo o contraseña incorrectos");
        }

        // Si las credenciales son correctas, devuelve la entidad cliente
        return cliente;
    }

    @Override
    public Cliente register(ClienteRequestDto clienteRequestDto) {
        // Verifica si ya existe un cliente con el mismo correo; si existe, lanza excepción de conflicto
        if (clienteRepository.findByCorreo(clienteRequestDto.getCorreo()).isPresent()) {
            throw new EmailAlreadyExistsException("El correo ya está registrado");
        }

        // Construye la entidad Cliente con los datos recibidos en el DTO
        var cliente = Cliente.builder()
                .nombre(clienteRequestDto.getNombre())         // Nombre del nuevo cliente
                .apellido1(clienteRequestDto.getApellido1())   // Primer apellido
                .apellido2(clienteRequestDto.getApellido2())   // Segundo apellido
                .correo(clienteRequestDto.getCorreo())         // Correo electrónico
                .contrasena(clienteRequestDto.getContrasena()) // Contraseña (texto plano por ahora)
                .telefono(clienteRequestDto.getTelefono())     // Teléfono
                .fecha_registro(LocalDate.now())               // Fecha actual como fecha de registro
                .build();

        // Guarda el nuevo cliente en la base de datos y devuelve la entidad persistida (con el ID generado)
        return clienteRepository.addCliente(cliente);
    }
}
