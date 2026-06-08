package com.ucr.repuestos_api.models.ServicioBrindado;

public record ServicioBrindadoResponseModel(
        String nombreRepuesto,
        Integer cantidadRepuestos,
        String nombreServicio,
        String nombreCliente) {
}