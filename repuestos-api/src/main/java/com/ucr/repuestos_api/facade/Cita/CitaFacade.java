package com.ucr.repuestos_api.facade.Cita;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ucr.repuestos_api.dtos.Cita.CitaRequestDto;
import com.ucr.repuestos_api.dtos.Cita.CitaResponseDto;
import com.ucr.repuestos_api.mappers.Cita.CitaMapper;
import com.ucr.repuestos_api.services.Cita.CitaService;

import jakarta.transaction.Transactional;
@Component
public class CitaFacade implements ICitaFacade{
    @Autowired
    CitaMapper citaMapper;
    @Autowired
    CitaService citaService;

    @Override
    public List<CitaResponseDto> getAll() {
        return citaMapper.toCitaDtoList(citaService.getAll());
    }

	@Override
    @Transactional
	public CitaResponseDto addCita(CitaRequestDto citaDto) {
        var entity = citaService.addCita(citaDto);
        return citaMapper.toCitaDto(entity);
	}

    @Override
    @Transactional
    public CitaResponseDto updateCita(Integer id, CitaRequestDto citaRequestDto) {
        var entity = citaService.updateCita(id, citaRequestDto);
        return citaMapper.toCitaDto(entity);
    }

    @Override
    public CitaResponseDto getById(Integer id) {
        var entity = citaService.getById(id);
        return citaMapper.toCitaDto(entity);
    }

    @Override
    public void removeCita(Integer id) {
        citaService.removeCita(id);
    }


}
