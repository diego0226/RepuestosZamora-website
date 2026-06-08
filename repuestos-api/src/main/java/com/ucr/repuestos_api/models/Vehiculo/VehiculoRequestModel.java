package com.ucr.repuestos_api.models.Vehiculo;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record VehiculoRequestModel(

        @NotBlank(message = "La placa no puede estar en blanco")
        @Size(max = 10, message = "La placa no puede superar los 10 caracteres")
        String placa,

        @NotBlank(message = "La marca no puede estar en blanco")
        @Size(max = 50, message = "La marca no puede superar los 50 caracteres")
        String marca,

        @NotBlank(message = "El modelo no puede estar en blanco")
        @Size(max = 50, message = "El modelo no puede superar los 50 caracteres")
        String modelo,

        @Min(value = 1900, message = "El año debe ser mayor a 1900")
        @Max(value = 2100, message = "El año no puede ser mayor a 2100")
        int anio,

        @NotNull(message = "El id del cliente es obligatorio")
        Integer idCliente) {
}
