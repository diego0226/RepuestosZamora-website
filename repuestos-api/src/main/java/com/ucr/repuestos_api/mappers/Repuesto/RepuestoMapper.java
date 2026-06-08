package com.ucr.repuestos_api.mappers.Repuesto;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ucr.repuestos_api.dtos.Repuesto.RepuestoDto;
import com.ucr.repuestos_api.entities.Repuesto.Repuesto;

@Component
public class RepuestoMapper {
    public RepuestoDto toRepuestoDto(Repuesto repuesto){
        if(repuesto == null){
            return null;
        }
        return new RepuestoDto(repuesto.getIdRepuesto(), repuesto.getNombre(), repuesto.getDescripcion(), 
                                repuesto.getPrecio(), repuesto.getStock());
    }

    public List<RepuestoDto> toRepuestoDtoList(List<Repuesto> repuesto){
        if(repuesto == null){
            return null; 
        }

        return repuesto.stream()
                .map(this::toRepuestoDto)
                .collect(Collectors.toList());
    }
}
