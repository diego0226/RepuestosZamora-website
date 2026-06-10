package com.ucr.repuestos_api.dtos.Auth;

public record AuthResponseDto(
        Integer idCliente,
        String nombre,
        String apellido1,
        String correo) {
}
