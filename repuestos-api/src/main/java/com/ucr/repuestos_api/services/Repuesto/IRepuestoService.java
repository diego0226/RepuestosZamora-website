package com.ucr.repuestos_api.services.Repuesto;

import java.util.List;

import com.ucr.repuestos_api.entities.Repuesto.Repuesto;

public interface IRepuestoService {
     List<Repuesto> getAll();
     Repuesto getById(Integer id);
}
