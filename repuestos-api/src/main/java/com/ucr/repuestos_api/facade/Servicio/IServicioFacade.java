package com.ucr.repuestos_api.facade.Servicio;

import java.util.List;

import com.ucr.repuestos_api.dtos.Servicio.ServicioDto;

public interface IServicioFacade {
    List<ServicioDto> getAll();
    ServicioDto getById(Integer id);
}
