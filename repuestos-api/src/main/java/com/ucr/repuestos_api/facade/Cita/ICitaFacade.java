package com.ucr.repuestos_api.facade.Cita;

import java.util.List;

import com.ucr.repuestos_api.dtos.Cita.CitaRequestDto;
import com.ucr.repuestos_api.dtos.Cita.CitaResponseDto;

public interface ICitaFacade {
    List<CitaResponseDto> getAll();
    CitaResponseDto addCita(CitaRequestDto citaDto);
    CitaResponseDto updateCita(Integer id, CitaRequestDto citaRequestDto);
    CitaResponseDto getById(Integer id);
    void removeCita(Integer id);
}
