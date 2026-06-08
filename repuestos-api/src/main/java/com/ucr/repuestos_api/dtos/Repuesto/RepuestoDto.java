package com.ucr.repuestos_api.dtos.Repuesto;

import java.math.BigDecimal;

public record RepuestoDto(
                Integer idRepuesto, 
                String nombre,
                String descripcion, 
                BigDecimal precio, 
                int stock) {
    
}
