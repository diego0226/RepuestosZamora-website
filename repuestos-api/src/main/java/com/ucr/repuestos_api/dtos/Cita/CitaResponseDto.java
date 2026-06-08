package com.ucr.repuestos_api.dtos.Cita;

import java.time.LocalDateTime;

import com.ucr.repuestos_api.entities.Cita.EstadoCita;

public record CitaResponseDto(
        LocalDateTime fechaCita,
        String nombreCliente,
        Integer id,
        String descripcionProblema,
        EstadoCita estadoCita,
        String placa,
        String nombreServicio,
        String nombreEmpleado) {
}
