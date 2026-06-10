package com.ucr.repuestos_api.controller.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucr.repuestos_api.dtos.Auth.AuthResponseDto;
import com.ucr.repuestos_api.models.Auth.AuthRequestModel;
import com.ucr.repuestos_api.repositories.Cliente.ClienteRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody AuthRequestModel request) {
        var cliente = clienteRepository.findByCorreo(request.correo())
                .orElse(null);

        if (cliente == null || !cliente.getContrasena().equals(request.contrasena())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        var response = new AuthResponseDto(
                cliente.getIdCliente(),
                cliente.getNombre(),
                cliente.getApellido1(),
                cliente.getCorreo());

        return ResponseEntity.ok(response);
    }
}
