package com.ucr.repuestos_api.models.Cliente;

import java.time.LocalDate;

public record ClienteResponseModel(
        String nombre, String apellido1, String apellido2, String telefono, LocalDate fecha_registro) {

}
