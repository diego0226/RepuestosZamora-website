package com.ucr.repuestos_api.services.Servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.repuestos_api.Exceptions.ServicioNotFoundException;
import com.ucr.repuestos_api.entities.Servicio.Servicio;
import com.ucr.repuestos_api.repositories.Servicio.ServicioRepository;

@Service
public class ServicioService implements IServicioService {
    @Autowired
    private ServicioRepository servicioRepository;

    @Override
    public List<Servicio> getAll() {
        return servicioRepository.getAll();
    }

    @Override
    public Servicio getById(Integer id) {
        return servicioRepository.findById(id)
                .orElseThrow(() -> new ServicioNotFoundException("Servicio no encontrado"));
    }
}
