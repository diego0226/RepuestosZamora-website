package com.ucr.repuestos_api.dtos.Vehiculo;

public record VehiculoResponseDto(
        String placa,
        String marca,
        String modelo,
        int anio,
        Integer idCliente) {
}
