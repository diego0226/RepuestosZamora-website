package com.ucr.repuestos_api.dtos.Vehiculo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VehiculoRequestDto {
    private String placa;
    private String marca;
    private String modelo;
    private int anio;
    private Integer idCliente;
}
