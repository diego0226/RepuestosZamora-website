package com.ucr.repuestos_api.services.Vehiculo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.repuestos_api.Exceptions.ClienteNotFoundException;
import com.ucr.repuestos_api.Exceptions.VehiculoNotFoundException;
import com.ucr.repuestos_api.dtos.Vehiculo.VehiculoRequestDto;
import com.ucr.repuestos_api.entities.Vehiculo.Vehiculo;
import com.ucr.repuestos_api.repositories.Cliente.ClienteRepository;
import com.ucr.repuestos_api.repositories.Vehiculo.VehiculoRepository;

@Service
public class VehiculoService implements IVehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public List<Vehiculo> getAll() {
        return vehiculoRepository.getAll();
    }

    @Override
    public Vehiculo addVehiculo(VehiculoRequestDto vehiculoRequestDto) {
        var cliente = clienteRepository.findById(vehiculoRequestDto.getIdCliente())
                .orElseThrow(() -> new ClienteNotFoundException("Cliente no encontrado"));

        var vehiculo = Vehiculo.builder()
                .placa(vehiculoRequestDto.getPlaca())
                .marca(vehiculoRequestDto.getMarca())
                .modelo(vehiculoRequestDto.getModelo())
                .anio(vehiculoRequestDto.getAnio())
                .cliente(cliente)
                .build();

        return vehiculoRepository.addVehiculo(vehiculo);
    }

    @Override
    public Vehiculo updateVehiculo(String placa, VehiculoRequestDto vehiculoRequestDto) {
        var vehiculo = vehiculoRepository.findById(placa)
                .orElseThrow(() -> new VehiculoNotFoundException("Vehiculo no encontrado"));

        var cliente = clienteRepository.findById(vehiculoRequestDto.getIdCliente())
                .orElseThrow(() -> new ClienteNotFoundException("Cliente no encontrado"));

        vehiculo.setMarca(vehiculoRequestDto.getMarca());
        vehiculo.setModelo(vehiculoRequestDto.getModelo());
        vehiculo.setAnio(vehiculoRequestDto.getAnio());
        vehiculo.setCliente(cliente);

        return vehiculoRepository.updateVehiculo(vehiculo);
    }

    @Override
    public void removeVehiculo(String placa) {
        var vehiculo = vehiculoRepository.findById(placa)
                .orElseThrow(() -> new VehiculoNotFoundException("Vehiculo no encontrado"));
        vehiculoRepository.delete(vehiculo);
    }
}
