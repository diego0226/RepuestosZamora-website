package com.ucr.repuestos_api.controller.Vehiculo;

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

import com.ucr.repuestos_api.dtos.Vehiculo.VehiculoResponseDto;
import com.ucr.repuestos_api.facade.Vehiculo.IVehiculoFacade;
import com.ucr.repuestos_api.mappers.Vehiculo.VehiculoMapper;
import com.ucr.repuestos_api.models.Vehiculo.VehiculoRequestModel;
import com.ucr.repuestos_api.models.Vehiculo.VehiculoResponseModel;

@RestController
@RequestMapping("/api/vehiculo")
public class VehiculoController {

    @Autowired
    private IVehiculoFacade vehiculoFacade;

    @Autowired
    private VehiculoMapper vehiculoMapper;

    @GetMapping
    public ResponseEntity<List<VehiculoResponseModel>> findAll() {
        return ResponseEntity.ok(vehiculoMapper.toVehiculoResponseModelList(vehiculoFacade.getAll()));
    }

    @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<List<VehiculoResponseModel>> findByCliente(@PathVariable("idCliente") Integer idCliente) {
        return ResponseEntity.ok(vehiculoMapper.toVehiculoResponseModelList(vehiculoFacade.getByIdCliente(idCliente)));
    }

    @GetMapping("/{placa}")
    public ResponseEntity<VehiculoResponseModel> findByPlaca(@PathVariable("placa") String placa) {
        var dto = vehiculoFacade.getByPlaca(placa);
        return ResponseEntity.ok(vehiculoMapper.toVehiculoResponseModel(dto));
    }

    @PostMapping
    public VehiculoResponseDto save(@RequestBody VehiculoRequestModel vehiculoRequestModel) {
        var dto = vehiculoMapper.toVehiculoRequestDto(vehiculoRequestModel);
        return vehiculoFacade.addVehiculo(dto);
    }

    @PutMapping(path = "/{placa}")
    public VehiculoResponseDto update(@PathVariable("placa") String placa,
            @RequestBody VehiculoRequestModel vehiculoRequestModel) {
        var dto = vehiculoMapper.toVehiculoRequestDto(vehiculoRequestModel);
        return vehiculoFacade.updateVehiculo(placa, dto);
    }

    @DeleteMapping(path = "/{placa}")
    public void remove(@PathVariable("placa") String placa) {
        vehiculoFacade.removeVehiculo(placa);
    }
}
