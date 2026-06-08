package com.ucr.repuestos_api.facade.Vehiculo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ucr.repuestos_api.dtos.Vehiculo.VehiculoRequestDto;
import com.ucr.repuestos_api.dtos.Vehiculo.VehiculoResponseDto;
import com.ucr.repuestos_api.mappers.Vehiculo.VehiculoMapper;
import com.ucr.repuestos_api.services.Vehiculo.IVehiculoService;

import jakarta.transaction.Transactional;

@Component
public class VehiculoFacade implements IVehiculoFacade {

    @Autowired
    private IVehiculoService vehiculoService;

    @Autowired
    private VehiculoMapper vehiculoMapper;

    @Override
    public List<VehiculoResponseDto> getAll() {
        return vehiculoMapper.toVehiculoResponseDtoList(vehiculoService.getAll());
    }

    @Override
    @Transactional
    public VehiculoResponseDto addVehiculo(VehiculoRequestDto vehiculoRequestDto) {
        var entity = vehiculoService.addVehiculo(vehiculoRequestDto);
        return vehiculoMapper.toVehiculoResponseDto(entity);
    }

    @Override
    @Transactional
    public VehiculoResponseDto updateVehiculo(String placa, VehiculoRequestDto vehiculoRequestDto) {
        var entity = vehiculoService.updateVehiculo(placa, vehiculoRequestDto);
        return vehiculoMapper.toVehiculoResponseDto(entity);
    }

    @Override
    public void removeVehiculo(String placa) {
        vehiculoService.removeVehiculo(placa);
    }
}
