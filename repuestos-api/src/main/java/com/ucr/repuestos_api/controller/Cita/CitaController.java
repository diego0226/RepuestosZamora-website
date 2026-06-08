package com.ucr.repuestos_api.controller.Cita;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucr.repuestos_api.dtos.Cita.CitaResponseDto;
import com.ucr.repuestos_api.facade.Cita.ICitaFacade;
import com.ucr.repuestos_api.mappers.Cita.CitaMapper;
import com.ucr.repuestos_api.models.Cita.CitaRequestModel;
import com.ucr.repuestos_api.models.Cita.CitaResponseModel;

@RestController
@RequestMapping("/api/citas")
public class CitaController {
    @Autowired
    private ICitaFacade citaFacade;
    @Autowired
    private CitaMapper citaMapper;

    @GetMapping
    public ResponseEntity<List<CitaResponseModel>> findAll() {
        return ResponseEntity.ok(citaMapper.toCitaResponseModelList(citaFacade.getAll()));
    }

    @PostMapping
    public CitaResponseDto save(@RequestBody CitaRequestModel citaRequestModel) {
        var dto = citaMapper.toCitaRequestDto(citaRequestModel);
        return citaFacade.addCita(dto);
    }

    @PutMapping(path = "/{id}")
    public CitaResponseDto update(@PathVariable("id") Integer id, @RequestBody CitaRequestModel citaRequestModel) {
        var dto = citaMapper.toCitaRequestDto(citaRequestModel);
        return citaFacade.updateCita(id, dto);
    }

    @GetMapping(path = "/{id}")
    public CitaResponseDto findById(@PathVariable("id") Integer id) {
        return citaFacade.getById(id);
    }

    @DeleteMapping(path = "/{id}")
    public void remove(@PathVariable("id")Integer id){
        citaFacade.removeCita(id);
    }
}
