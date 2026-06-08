package com.ucr.repuestos_api.services.Cita;

import java.util.List;

import com.ucr.repuestos_api.dtos.Cita.CitaRequestDto;
import com.ucr.repuestos_api.entities.Cita.Cita;

public interface ICitaService {
    List<Cita> getAll();
    Cita addCita(CitaRequestDto citaDto);
    Cita updateCita(Integer id, CitaRequestDto citaRequestDto);
    Cita getById(Integer id);
    void removeCita(Integer id);
}
