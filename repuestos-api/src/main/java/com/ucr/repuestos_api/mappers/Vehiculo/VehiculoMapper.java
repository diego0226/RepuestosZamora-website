package com.ucr.repuestos_api.mappers.Vehiculo;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ucr.repuestos_api.dtos.Vehiculo.VehiculoRequestDto;
import com.ucr.repuestos_api.dtos.Vehiculo.VehiculoResponseDto;
import com.ucr.repuestos_api.entities.Vehiculo.Vehiculo;
import com.ucr.repuestos_api.models.Vehiculo.VehiculoRequestModel;
import com.ucr.repuestos_api.models.Vehiculo.VehiculoResponseModel;

@Component
public class VehiculoMapper {

    public VehiculoResponseDto toVehiculoResponseDto(Vehiculo vehiculo) {
        if (vehiculo == null) {
            return null;
        }
        return new VehiculoResponseDto(
                vehiculo.getPlaca(),
                vehiculo.getMarca(),
                vehiculo.getModelo(),
                vehiculo.getAnio(),
                vehiculo.getCliente().getIdCliente());
    }

    public List<VehiculoResponseDto> toVehiculoResponseDtoList(List<Vehiculo> vehiculos) {
        if (vehiculos == null) {
            return null;
        }
        return vehiculos.stream()
                .map(this::toVehiculoResponseDto)
                .collect(Collectors.toList());
    }

    public VehiculoResponseModel toVehiculoResponseModel(VehiculoResponseDto vehiculoResponseDto) {
        if (vehiculoResponseDto == null) {
            return null;
        }
        return new VehiculoResponseModel(
                vehiculoResponseDto.placa(),
                vehiculoResponseDto.marca(),
                vehiculoResponseDto.modelo(),
                vehiculoResponseDto.anio(),
                vehiculoResponseDto.idCliente());
    }

    public List<VehiculoResponseModel> toVehiculoResponseModelList(List<VehiculoResponseDto> vehiculoResponseDtos) {
        if (vehiculoResponseDtos == null) {
            return null;
        }
        return vehiculoResponseDtos.stream()
                .map(this::toVehiculoResponseModel)
                .collect(Collectors.toList());
    }

    public VehiculoRequestDto toVehiculoRequestDto(VehiculoRequestModel vehiculoRequestModel) {
        if (vehiculoRequestModel == null) {
            return null;
        }
        return new VehiculoRequestDto(
                vehiculoRequestModel.placa(),
                vehiculoRequestModel.marca(),
                vehiculoRequestModel.modelo(),
                vehiculoRequestModel.anio(),
                vehiculoRequestModel.idCliente());
    }
}
