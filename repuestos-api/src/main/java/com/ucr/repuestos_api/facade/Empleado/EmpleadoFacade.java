package com.ucr.repuestos_api.facade.Empleado;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ucr.repuestos_api.dtos.Empleado.EmpleadoDto;
import com.ucr.repuestos_api.mappers.Empleado.EmpleadoMapper;
import com.ucr.repuestos_api.services.Empleado.IEmpleadoService;

@Component
public class EmpleadoFacade implements IEmpleadoFacade {

    @Autowired
    private EmpleadoMapper empleadoMapper;

    @Autowired
    private IEmpleadoService empleadoService;

    @Override
    public List<EmpleadoDto> getAll() {
        return empleadoMapper.toEmpleadoDtoList(empleadoService.getAll());
    }

    @Override
    public EmpleadoDto getById(Integer id) {
        return empleadoMapper.toEmpleadoDto(empleadoService.getById(id));
    }
}
