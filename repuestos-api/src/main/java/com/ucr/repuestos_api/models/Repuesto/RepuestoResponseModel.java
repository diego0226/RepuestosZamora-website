package com.ucr.repuestos_api.models.Repuesto;

import java.math.BigDecimal;

public record RepuestoResponseModel(
                Integer idRepuesto, 
                String nombre,
                String descripcion, 
                BigDecimal precio, 
                int stock) {
}