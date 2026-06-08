package com.ucr.repuestos_api.dtos.Servicio;

import java.math.BigDecimal;

public record ServicioDto(
        String nombreServicio,
        String descripcion,
        BigDecimal precio) {
        
}
