package com.ucr.repuestos_api.facade.Empleado;

import java.util.List;

import com.ucr.repuestos_api.dtos.Empleado.EmpleadoDto;

public interface IEmpleadoFacade {
    List<EmpleadoDto> getAll();
    EmpleadoDto getById(Integer id);
}
