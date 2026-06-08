package com.ucr.repuestos_api.dtos.Empleado;

public record EmpleadoDto(
        Integer idEmpleado,
        String nombre,
        String apellido1,
        String apellido2,
        String correo,
        Integer idServicio) {
}
