package com.ucr.repuestos_api.mappers.Empleado;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ucr.repuestos_api.dtos.Empleado.EmpleadoDto;
import com.ucr.repuestos_api.entities.Empleado.Empleado;

@Component
public class EmpleadoMapper {

    public EmpleadoDto toEmpleadoDto(Empleado empleado) {
        if (empleado == null) {
            return null;
        }
        return new EmpleadoDto(
                empleado.getIdEmpleado(),
                empleado.getNombre(),
                empleado.getApellido1(),
                empleado.getApellido2(),
                empleado.getCorreo(),
                empleado.getServicio().getIdServicio());
    }

    public List<EmpleadoDto> toEmpleadoDtoList(List<Empleado> empleados) {
        if (empleados == null) {
            return null;
        }
        return empleados.stream()
                .map(this::toEmpleadoDto)
                .collect(Collectors.toList());
    }
}
