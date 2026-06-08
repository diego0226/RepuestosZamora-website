package com.ucr.repuestos_api.mappers.ServicioBrindado;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ucr.repuestos_api.dtos.ServicioBrindado.ServicioBrindadoRequestDto;
import com.ucr.repuestos_api.dtos.ServicioBrindado.ServicioBrindadoResponseDto;
import com.ucr.repuestos_api.entities.ServicioBrindado.ServicioBrindado;
import com.ucr.repuestos_api.models.ServicioBrindado.ServicioBrindadoRequestModel;
import com.ucr.repuestos_api.models.ServicioBrindado.ServicioBrindadoResponseModel;

@Component
public class ServicioBrindadoMapper {

    public ServicioBrindadoResponseDto toServicioBrindadoResponseDto(ServicioBrindado servicioBrindado) {
        return new ServicioBrindadoResponseDto(
                obtenerNombreRepuesto(servicioBrindado),
                servicioBrindado.getCantidadRepuestos(),
                obtenerNombreServicio(servicioBrindado),
                servicioBrindado.getCliente().getNombre() + " " + servicioBrindado.getCliente().getApellido1());
    }

    public List<ServicioBrindadoResponseDto> toServicioBrindadoResponseDtoList(List<ServicioBrindado> serviciosBrindados) {
        return serviciosBrindados.stream()
                .map(this::toServicioBrindadoResponseDto)
                .collect(Collectors.toList());
    }

    public ServicioBrindadoResponseModel toServicioBrindadoResponseModel(ServicioBrindadoResponseDto dto) {
        return new ServicioBrindadoResponseModel(
                dto.nombreRepuesto(),
                dto.cantidadRepuestos(),
                dto.nombreServicio(),
                dto.nombreCliente());
    }

    public List<ServicioBrindadoResponseModel> toServicioBrindadoResponseModelList(List<ServicioBrindadoResponseDto> dtos) {
        return dtos.stream()
                .map(this::toServicioBrindadoResponseModel)
                .collect(Collectors.toList());
    }

    public ServicioBrindadoRequestDto toServicioBrindadoRequestDto(ServicioBrindadoRequestModel model) {
        return new ServicioBrindadoRequestDto(
                model.idRepuesto(),
                model.cantidadRepuestos(),
                model.idServicio(),
                model.idCliente());
    }

    private String obtenerNombreRepuesto(ServicioBrindado servicioBrindado) {
        if (servicioBrindado.getRepuesto() != null) {
            return servicioBrindado.getRepuesto().getNombre();
        } else {
            return null;
        }
    }

    private String obtenerNombreServicio(ServicioBrindado servicioBrindado) {
        if (servicioBrindado.getServicio() != null) {
            return servicioBrindado.getServicio().getNombreServicio();
        } else {
            return null;
        }
    }
}