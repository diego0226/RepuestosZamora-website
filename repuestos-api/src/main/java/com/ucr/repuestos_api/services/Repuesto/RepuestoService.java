package com.ucr.repuestos_api.services.Repuesto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.repuestos_api.Exceptions.RepuestoNotFoundException;
import com.ucr.repuestos_api.entities.Repuesto.Repuesto;
import com.ucr.repuestos_api.repositories.Repuesto.RepuestoRepository;

@Service
public class RepuestoService implements IRepuestoService {
    @Autowired
    private RepuestoRepository repuestoRepository;

    @Override
    public List<Repuesto> getAll() {
        return repuestoRepository.getAll();
    }

    @Override
    public Repuesto getById(Integer id) {
        return repuestoRepository.findById(id)
                .orElseThrow(() -> new RepuestoNotFoundException("Repuesto no encontrado"));
    }
}
