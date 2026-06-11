package com.ucr.repuestos_api.models.Servicio;

import java.math.BigDecimal;

public record ServicioResponseModel(
    Integer idServicio,
    String nombreServicio,
    String descripcion,
    BigDecimal precio){ 
}
