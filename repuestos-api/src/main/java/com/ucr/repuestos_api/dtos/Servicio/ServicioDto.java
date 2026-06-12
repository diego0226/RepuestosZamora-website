package com.ucr.repuestos_api.dtos.Servicio;

import java.math.BigDecimal;

public record ServicioDto(
        Integer idServicio,
        String nombreServicio,
        String descripcion,
        BigDecimal precio) {

}
