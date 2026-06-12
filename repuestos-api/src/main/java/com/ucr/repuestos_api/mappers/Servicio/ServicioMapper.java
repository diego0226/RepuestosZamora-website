package com.ucr.repuestos_api.mappers.Servicio;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ucr.repuestos_api.dtos.Servicio.ServicioDto;
import com.ucr.repuestos_api.entities.Servicio.Servicio;

@Component
public class ServicioMapper {
    public ServicioDto toServicioDto(Servicio servicio) {
        return new ServicioDto(
                servicio.getIdServicio(),
                servicio.getNombreServicio(),
                servicio.getDescripcion(),
                servicio.getPrecio()
        );
    }

    public List<ServicioDto> toServicioDtoList(List<Servicio> servicios) {
        return servicios.stream()
                .map(this::toServicioDto)
                .toList();
    }
}
