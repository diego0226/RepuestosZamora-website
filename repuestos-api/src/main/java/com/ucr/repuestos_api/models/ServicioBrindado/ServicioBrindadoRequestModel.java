package com.ucr.repuestos_api.models.ServicioBrindado;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ServicioBrindadoRequestModel(

    Integer idRepuesto,

    @Min(value = 0, message = "La cantidad de repuestos debe ser al menos 1")
    Integer cantidadRepuestos,

    Integer idServicio,

    @NotNull(message = "El id del cliente es obligatorio")
    Integer idCliente
){
}