package com.ucr.repuestos_api.models.Cita;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CitaRequestModel(

    @NotNull(message = "La fecha de la cita es requerida")
    @Future(message = "La fecha debe ser futura")
    LocalDateTime fechaCita,

    @NotBlank(message = "La descripción del problema es requerida")
    String descripcionProblema,

    @NotNull(message = "El id del cliente es requerido")
    @Positive(message = "El id del cliente debe ser mayor a 0")
    Integer idCliente,

    @NotNull(message = "El id del servicio es requerido")
    @Positive(message = "El id del servicio debe ser mayor a 0")
    Integer idServicio,

    @NotBlank(message = "La placa es requerida")
    String placa
) {
}
