package com.ucr.repuestos_api.controller.Servicio;

import org.springframework.web.bind.annotation.RestController;

import com.ucr.repuestos_api.dtos.Servicio.ServicioDto;
import com.ucr.repuestos_api.facade.Servicio.IServicioFacade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/servicio")
public class ServicioController {
    @Autowired
    private IServicioFacade servicioFacade;

    @GetMapping
    public ResponseEntity<List<ServicioDto>> getAll() {
        return ResponseEntity.ok(servicioFacade.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServicioDto> getById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(servicioFacade.getById(id));
    }
}

