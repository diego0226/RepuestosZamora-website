package com.ucr.repuestos_api.services.Empleado;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.repuestos_api.Exceptions.EmpleadoNotFoundException;
import com.ucr.repuestos_api.entities.Empleado.Empleado;
import com.ucr.repuestos_api.repositories.Empleado.EmpleadoRepository;

@Service
public class EmpleadoService implements IEmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Override
    public List<Empleado> getAll() {
        return empleadoRepository.getAll();
    }

    @Override
    public Empleado getById(Integer id) {
        return empleadoRepository.findById(id)
                .orElseThrow(() -> new EmpleadoNotFoundException("Empleado no encontrado"));
    }
}
