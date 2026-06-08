package com.ucr.repuestos_api.services.Cita;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.repuestos_api.Exceptions.CitaNotFoundException;
import com.ucr.repuestos_api.Exceptions.ClienteNotFoundException;
import com.ucr.repuestos_api.Exceptions.EmpleadoNotFoundException;
import com.ucr.repuestos_api.Exceptions.ServicioNotFoundException;
import com.ucr.repuestos_api.Exceptions.VehiculoNotFoundException;
import com.ucr.repuestos_api.dtos.Cita.CitaRequestDto;
import com.ucr.repuestos_api.entities.Cita.Cita;
import com.ucr.repuestos_api.entities.Cita.EstadoCita;
import com.ucr.repuestos_api.repositories.Cita.CitaRepository;
import com.ucr.repuestos_api.repositories.Cliente.ClienteRepository;
import com.ucr.repuestos_api.repositories.Empleado.EmpleadoRepository;
import com.ucr.repuestos_api.repositories.Servicio.ServicioRepository;
import com.ucr.repuestos_api.repositories.Vehiculo.VehiculoRepository;

@Service
public class CitaService implements ICitaService {

    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Override
    public List<Cita> getAll() {
        return citaRepository.getAll();
    }

    @Override
    public Cita addCita(CitaRequestDto citaDto) {
        var cliente = clienteRepository.findById(citaDto.getIdCliente())
                .orElseThrow(() -> new ClienteNotFoundException("Cliente no encontrado"));

        var vehiculo = vehiculoRepository.findById(citaDto.getPlaca())
                .orElseThrow(() -> new VehiculoNotFoundException("Vehiculo no encontrado"));

        var servicio = servicioRepository.findById(citaDto.getIdServicio())
                .orElseThrow(() -> new ServicioNotFoundException("Servicio no encontrado"));

        var empleado = empleadoRepository.findByServicio(servicio)
                .orElseThrow(() -> new EmpleadoNotFoundException("Empleado no encontrado para el servicio indicado"));

        var cita = Cita.builder()
                .fechaCita(citaDto.getFechaCita())
                .descripcionProblema(citaDto.getDescripcionProblema())
                .cliente(cliente)
                .servicio(servicio)
                .vehiculo(vehiculo)
                .empleado(empleado)
                .estado(EstadoCita.pendiente)
                .build();

        return citaRepository.addProduct(cita);
    }

    @Override
    public Cita updateCita(Integer id, CitaRequestDto citaRequestDto) {
        var cita = citaRepository.findById(id)
                .orElseThrow(() -> new CitaNotFoundException("Cita no encontrada"));

        var cliente = clienteRepository.findById(citaRequestDto.getIdCliente())
                .orElseThrow(() -> new ClienteNotFoundException("Cliente no encontrado"));

        var vehiculo = vehiculoRepository.findById(citaRequestDto.getPlaca())
                .orElseThrow(() -> new VehiculoNotFoundException("Vehiculo no encontrado"));

        var servicio = servicioRepository.findById(citaRequestDto.getIdServicio())
                .orElseThrow(() -> new ServicioNotFoundException("Servicio no encontrado"));

        var empleado = empleadoRepository.findByServicio(servicio)
                .orElseThrow(() -> new EmpleadoNotFoundException("Empleado no encontrado para el servicio indicado"));

        cita.setFechaCita(citaRequestDto.getFechaCita());
        cita.setDescripcionProblema(citaRequestDto.getDescripcionProblema());
        cita.setCliente(cliente);
        cita.setServicio(servicio);
        cita.setVehiculo(vehiculo);
        cita.setEmpleado(empleado);

        return citaRepository.save(cita);
    }

    @Override
    public Cita getById(Integer id) {
        return citaRepository.findById(id)
                .orElseThrow(() -> new CitaNotFoundException("Cita no encontrada"));
    }

    @Override
    public void removeCita(Integer id) {
        var cita = citaRepository.findById(id)
                .orElseThrow(() -> new CitaNotFoundException("Cita no encontrada"));
        cita.setEstado(EstadoCita.cancelada);
        citaRepository.delete(cita);
    }
}
