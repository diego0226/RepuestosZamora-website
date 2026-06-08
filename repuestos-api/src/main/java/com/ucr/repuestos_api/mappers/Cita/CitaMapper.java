package com.ucr.repuestos_api.mappers.Cita;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ucr.repuestos_api.dtos.Cita.CitaRequestDto;
import com.ucr.repuestos_api.dtos.Cita.CitaResponseDto;
import com.ucr.repuestos_api.entities.Cita.Cita;
import com.ucr.repuestos_api.models.Cita.CitaRequestModel;
import com.ucr.repuestos_api.models.Cita.CitaResponseModel;

@Component
public class CitaMapper {

    public CitaResponseDto toCitaDto(Cita cita) {
        if (cita == null) {
            return null;
        }
        return new CitaResponseDto(
                cita.getFechaCita(),
                cita.getCliente().getNombre() + " " + cita.getCliente().getApellido1(),
                cita.getId(),
                cita.getDescripcionProblema(),
                cita.getEstado(),
                cita.getVehiculo().getPlaca(),
                cita.getServicio().getNombreServicio(),
                cita.getEmpleado().getNombre() + " " + cita.getEmpleado().getApellido1());
    }

    public List<CitaResponseDto> toCitaDtoList(List<Cita> citas) {
        if (citas == null) {
            return null;
        }
        return citas.stream()
                .map(this::toCitaDto)
                .collect(Collectors.toList());
    }

    public CitaResponseModel toCitaResponseModel(CitaResponseDto citaDTO) {
        if (citaDTO == null) {
            return null;
        }
        return new CitaResponseModel(
                citaDTO.fechaCita(),
                citaDTO.nombreCliente(),
                citaDTO.id(),
                citaDTO.descripcionProblema(),
                citaDTO.estadoCita(),
                citaDTO.placa(),
                citaDTO.nombreServicio(),
                citaDTO.nombreEmpleado());
    }

    public List<CitaResponseModel> toCitaResponseModelList(List<CitaResponseDto> citaResponseDTO) {
        if (citaResponseDTO == null) {
            return null;
        }
        return citaResponseDTO.stream()
                .map(this::toCitaResponseModel)
                .collect(Collectors.toList());
    }

    public CitaRequestDto toCitaRequestDto(CitaRequestModel cita) {
        if (cita == null) {
            return null;
        }
        CitaRequestDto citaDto = new CitaRequestDto();
        citaDto.setFechaCita(cita.fechaCita());
        citaDto.setIdCliente(cita.idCliente());
        citaDto.setDescripcionProblema(cita.descripcionProblema());
        citaDto.setPlaca(cita.placa());
        citaDto.setIdServicio(cita.idServicio());
        return citaDto;
    }
}
