package com.ucr.repuestos_api.models.Cliente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ClienteRequestModel(


    @NotBlank(message = "El nombre no puede estar en blanco") 
    @Size(max = 50, message = "El nombre no puede superar los 50 caracteres")
    String nombre,

    @NotBlank(message = "Es obligatorio ingresar el primer apellido") 
    @Size(max = 50, message = "El apellido no puede superar los 50 caracteres")
    String apellido1,

    @Size(max = 50, message = "El apellido no puede superar los 50 caracteres")
    String apellido2,

    @NotBlank(message = "Debe ingresar obligatoriamente un correo")
    @Email(message = "Formato del correo es invalido") 
    String correo,

    @NotBlank(message = "Debe ingresar una contraseña")
    @Size(min = 8, message = "La contraseña debe tener minimo 8 caracteres") 
    String contrasena,

    @Pattern(regexp = "^[+]?[0-9\\s\\-()]{7,20}$", message = "El formato del teléfono no es válido")
    String telefono
){   
}
