package com.ucr.repuestos_api.services.Vehiculo;

import java.util.List;

import com.ucr.repuestos_api.dtos.Vehiculo.VehiculoRequestDto;
import com.ucr.repuestos_api.entities.Vehiculo.Vehiculo;

public interface IVehiculoService {
    List<Vehiculo> getAll();

    List<Vehiculo> getByIdCliente(Integer idCliente);

    Vehiculo getByPlaca(String placa);

    Vehiculo addVehiculo(VehiculoRequestDto vehiculoRequestDto);

    Vehiculo updateVehiculo(String placa, VehiculoRequestDto vehiculoRequestDto);

    void removeVehiculo(String placa);
}
