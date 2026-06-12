package com.ucr.repuestos_api.facade.Repuesto;

import java.util.List;

import com.ucr.repuestos_api.dtos.Repuesto.RepuestoDto;

public interface IRepuestoFacade {
    List<RepuestoDto> getAll();
    RepuestoDto getById(Integer id);
}
