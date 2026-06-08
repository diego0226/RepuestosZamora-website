package com.ucr.repuestos_api.dtos.ServicioBrindado;

public record ServicioBrindadoResponseDto(
        String nombreRepuesto,
        Integer cantidadRepuestos,
        String nombreServicio,
        String nombreCliente) {
}