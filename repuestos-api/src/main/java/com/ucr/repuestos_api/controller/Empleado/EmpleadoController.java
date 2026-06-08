package com.ucr.repuestos_api.controller.Empleado;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucr.repuestos_api.dtos.Empleado.EmpleadoDto;
import com.ucr.repuestos_api.facade.Empleado.IEmpleadoFacade;

@RestController
@RequestMapping("/api/empleados")
public class EmpleadoController {

    @Autowired
    private IEmpleadoFacade empleadoFacade;

    @GetMapping
    public ResponseEntity<List<EmpleadoDto>> findAll() {
        return ResponseEntity.ok(empleadoFacade.getAll());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<EmpleadoDto> findById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(empleadoFacade.getById(id));
    }
}
