package com.ucr.repuestos_api.facade.Servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ucr.repuestos_api.dtos.Servicio.ServicioDto;
import com.ucr.repuestos_api.mappers.Servicio.ServicioMapper;
import com.ucr.repuestos_api.services.Servicio.ServicioService;
@Component
public class ServicioFacade implements IServicioFacade{
    @Autowired
    ServicioMapper servicioMapper; 
    @Autowired
    ServicioService servicioService; 
    @Override
    public List<ServicioDto> getAll() {
        return servicioMapper.toServicioDtoList(servicioService.getAll());
    }
    
}
