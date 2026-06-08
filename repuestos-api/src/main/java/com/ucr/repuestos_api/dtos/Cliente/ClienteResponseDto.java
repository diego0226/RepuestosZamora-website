package com.ucr.repuestos_api.dtos.Cliente;

import java.time.LocalDate;

public record ClienteResponseDto(
        String nombre, String apellido1, String apellido2, String telefono, LocalDate fecha_registro) {

}
