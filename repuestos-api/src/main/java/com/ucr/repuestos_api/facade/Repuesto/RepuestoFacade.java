package com.ucr.repuestos_api.facade.Repuesto;

import com.ucr.repuestos_api.services.Repuesto.RepuestoService;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ucr.repuestos_api.dtos.Repuesto.RepuestoDto;
import com.ucr.repuestos_api.mappers.Repuesto.RepuestoMapper;

@Component
public class RepuestoFacade implements IRepuestoFacade{
    @Autowired
    RepuestoMapper repuestoMapper; 
    @Autowired
    RepuestoService repuestoService; 

    @Override
    public List<RepuestoDto> getAll() {
       return repuestoMapper.toRepuestoDtoList(repuestoService.getAll());
    }
}
