package com.ucr.repuestos_api.services.Empleado;

import java.util.List;

import com.ucr.repuestos_api.entities.Empleado.Empleado;

public interface IEmpleadoService {
    List<Empleado> getAll();
    Empleado getById(Integer id);
}
