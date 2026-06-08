package com.ucr.repuestos_api.controller.ServicioBrindado;

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

import com.ucr.repuestos_api.dtos.ServicioBrindado.ServicioBrindadoResponseDto;
import com.ucr.repuestos_api.facade.ServicioBrindado.IServicioBrindadoFacade;
import com.ucr.repuestos_api.mappers.ServicioBrindado.ServicioBrindadoMapper;
import com.ucr.repuestos_api.models.ServicioBrindado.ServicioBrindadoRequestModel;
import com.ucr.repuestos_api.models.ServicioBrindado.ServicioBrindadoResponseModel;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/servicio-brindado")
public class ServicioBrindadoController {

    @Autowired
    private IServicioBrindadoFacade servicioBrindadoFacade;

    @Autowired
    private ServicioBrindadoMapper servicioBrindadoMapper;

    @GetMapping(path = "/cliente/{idCliente}")
    public ResponseEntity<List<ServicioBrindadoResponseModel>> findByCliente(@PathVariable("idCliente") Integer idCliente) {
        return ResponseEntity.ok(servicioBrindadoMapper.toServicioBrindadoResponseModelList(
                servicioBrindadoFacade.getByCliente(idCliente)));
    }

    @PostMapping
    public ServicioBrindadoResponseDto save(@Valid @RequestBody ServicioBrindadoRequestModel servicioBrindadoRequestModel) {
        var dto = servicioBrindadoMapper.toServicioBrindadoRequestDto(servicioBrindadoRequestModel);
        return servicioBrindadoFacade.addServicioBrindado(dto);
    }

    @PutMapping(path = "/{idServicioBrindado}")
    public ServicioBrindadoResponseDto update(@PathVariable("idServicioBrindado") Integer idServicioBrindado, @Valid @RequestBody ServicioBrindadoRequestModel servicioBrindadoRequestModel) {
        var dto = servicioBrindadoMapper.toServicioBrindadoRequestDto(servicioBrindadoRequestModel);
        return servicioBrindadoFacade.updateServicioBrindado(idServicioBrindado, dto);
    }

    @DeleteMapping(path = "/{idServicioBrindado}")
    public void remove(@PathVariable("idServicioBrindado") Integer idServicioBrindado) {
        servicioBrindadoFacade.removeServicioBrindado(idServicioBrindado);
    }
}