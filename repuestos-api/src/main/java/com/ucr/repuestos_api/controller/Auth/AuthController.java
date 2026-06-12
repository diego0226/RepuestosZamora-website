package com.ucr.repuestos_api.controller.Auth;

import org.springframework.beans.factory.annotation.Autowired; // Inyección automática de dependencias
import org.springframework.http.HttpStatus;                    // Códigos de estado HTTP
import org.springframework.http.ResponseEntity;               // Construcción de respuestas HTTP
import org.springframework.web.bind.annotation.PostMapping;   // Mapea peticiones POST
import org.springframework.web.bind.annotation.RequestBody;   // El parámetro proviene del cuerpo de la petición
import org.springframework.web.bind.annotation.RequestMapping; // Ruta base del controlador
import org.springframework.web.bind.annotation.RestController; // Marca la clase como controlador REST

import com.ucr.repuestos_api.facade.Auth.IAuthFacade;            // Fachada con las operaciones de autenticación
import com.ucr.repuestos_api.mappers.Auth.AuthMapper;            // Mapper que convierte DTO -> modelo de respuesta
import com.ucr.repuestos_api.mappers.Cliente.ClienteMapper;      // Mapper reutilizado para convertir el modelo de registro a DTO
import com.ucr.repuestos_api.models.Auth.AuthRequestModel;       // Modelo de entrada del login (correo + contraseña)
import com.ucr.repuestos_api.models.Auth.AuthResponseModel;      // Modelo de salida con los datos del cliente
import com.ucr.repuestos_api.models.Cliente.ClienteRequestModel; // Modelo de entrada del registro (datos del cliente)

import jakarta.validation.Valid; // Activa la validación de los campos de los modelos de entrada

// Controlador REST que expone los endpoints de autenticación. Es una capa delgada:
// solo recibe la petición, delega en la fachada y convierte el resultado con el mapper.
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // Fachada que orquesta la lógica de login y registro
    @Autowired
    private IAuthFacade authFacade;

    // Mapper de Auth: convierte el AuthResponseDto en el AuthResponseModel que se envía al frontend
    @Autowired
    private AuthMapper authMapper;

    // Mapper de Cliente reutilizado: convierte el ClienteRequestModel del registro en un ClienteRequestDto
    @Autowired
    private ClienteMapper clienteMapper;

    // Endpoint POST /api/auth/login — valida credenciales y devuelve los datos del cliente
    @PostMapping("/login")
    public ResponseEntity<AuthResponseModel> login(@Valid @RequestBody AuthRequestModel request) {
        // Delega la autenticación a la fachada, que devuelve un DTO con los datos del cliente
        var dto = authFacade.login(request.correo(), request.contrasena());
        // Convierte el DTO en el modelo de respuesta y lo retorna con estado 200 OK
        return ResponseEntity.ok(authMapper.toAuthResponseModel(dto));
    }

    // Endpoint POST /api/auth/register — registra un nuevo cliente y devuelve sus datos
    @PostMapping("/register")
    public ResponseEntity<AuthResponseModel> register(@Valid @RequestBody ClienteRequestModel request) {
        // Convierte el modelo de registro en un DTO usando el mapper de Cliente (reutilización de código)
        var requestDto = clienteMapper.toClienteRequestDto(request);
        // Delega el registro a la fachada, que devuelve un DTO con los datos del cliente creado
        var responseDto = authFacade.register(requestDto);
        // Convierte el DTO en el modelo de respuesta y lo retorna con estado 201 Created
        return ResponseEntity.status(HttpStatus.CREATED).body(authMapper.toAuthResponseModel(responseDto));
    }
}
