package com.ucr.repuestos_api.controller.Repuesto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucr.repuestos_api.dtos.Repuesto.RepuestoDto;
import com.ucr.repuestos_api.facade.Repuesto.IRepuestoFacade;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/repuesto")
public class RepuestoController {
    @Autowired
    private IRepuestoFacade repuestoFacade; 
    @GetMapping()
    public ResponseEntity<List<RepuestoDto>> findAll() {
        return ResponseEntity.ok(repuestoFacade.getAll());
    }
}
