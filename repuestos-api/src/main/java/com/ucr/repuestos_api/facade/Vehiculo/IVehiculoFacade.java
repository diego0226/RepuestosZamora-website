package com.ucr.repuestos_api.facade.Vehiculo;

import java.util.List;

import com.ucr.repuestos_api.dtos.Vehiculo.VehiculoRequestDto;
import com.ucr.repuestos_api.dtos.Vehiculo.VehiculoResponseDto;

public interface IVehiculoFacade {
    List<VehiculoResponseDto> getAll();

    VehiculoResponseDto addVehiculo(VehiculoRequestDto vehiculoRequestDto);

    VehiculoResponseDto updateVehiculo(String placa, VehiculoRequestDto vehiculoRequestDto);

    void removeVehiculo(String placa);
}
