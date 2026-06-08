package com.ucr.repuestos_api.dtos.Cita;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CitaRequestDto {
    private LocalDateTime fechaCita;
    private String descripcionProblema;
    private Integer idCliente;
    private Integer idServicio;
    private String placa;
}
