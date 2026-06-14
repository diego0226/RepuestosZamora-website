package com.ucr.repuestos_api.models.Cliente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

// Modelo de entrada para la edición del perfil del cliente desde la SPA.
// Solo expone los datos que el usuario puede modificar en su perfil (correo y teléfono),
// por lo que NO exige la contraseña como sí lo hace ClienteRequestModel.
public record ClientePerfilRequestModel(

    @NotBlank(message = "Debe ingresar obligatoriamente un correo")
    @Email(message = "Formato del correo es invalido")
    String correo,

    @Pattern(regexp = "^[+]?[0-9\\s\\-()]{7,20}$", message = "El formato del teléfono no es válido")
    String telefono
){
}
