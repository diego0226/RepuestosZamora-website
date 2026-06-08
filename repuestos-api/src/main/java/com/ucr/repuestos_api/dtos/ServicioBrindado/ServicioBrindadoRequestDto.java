package com.ucr.repuestos_api.dtos.ServicioBrindado;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServicioBrindadoRequestDto {
    private Integer idRepuesto;
    private Integer cantidadRepuestos;
    private Integer idServicio;
    private Integer idCliente;
}