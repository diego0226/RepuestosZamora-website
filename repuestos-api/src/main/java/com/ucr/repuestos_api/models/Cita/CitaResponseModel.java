package com.ucr.repuestos_api.models.Cita;

import java.time.LocalDateTime;

import com.ucr.repuestos_api.entities.Cita.EstadoCita;

public record CitaResponseModel(
        LocalDateTime fechaCita,
        String nombreCliente,
        Integer id,
        String descripcionProblema,
        EstadoCita estadoCita,
        String placa,
        String nombreServicio,
        String nombreEmpleado) {
}
