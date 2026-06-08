package com.ucr.repuestos_api.services.Servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.repuestos_api.entities.Servicio.Servicio;
import com.ucr.repuestos_api.repositories.Servicio.ServicioRepository;

@Service
public class ServicioService {
    @Autowired
    private ServicioRepository servicioRepository; 

    public List<Servicio> getAll(){
        return servicioRepository.getAll(); 
    }
}
