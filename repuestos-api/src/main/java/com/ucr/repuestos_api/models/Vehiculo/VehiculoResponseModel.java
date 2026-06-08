package com.ucr.repuestos_api.models.Vehiculo;

public record VehiculoResponseModel(
        String placa,
        String marca,
        String modelo,
        int anio,
        Integer idCliente) {
}
