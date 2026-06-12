package com.ucr.repuestos_api.models.Auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AuthRequestModel(
        @NotBlank @Email String correo,
        @NotBlank String contrasena) {
}
