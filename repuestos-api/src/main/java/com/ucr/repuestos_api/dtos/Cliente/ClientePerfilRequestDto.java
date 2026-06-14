package com.ucr.repuestos_api.dtos.Cliente;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// DTO interno (Controller -> Facade -> Service) para la edición del perfil del cliente.
// Transporta únicamente los campos editables desde el perfil: correo y teléfono.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientePerfilRequestDto {
    private String correo;
    private String telefono;
}
