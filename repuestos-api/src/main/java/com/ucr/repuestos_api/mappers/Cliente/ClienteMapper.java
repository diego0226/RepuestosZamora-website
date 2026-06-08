package com.ucr.repuestos_api.mappers.Cliente;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ucr.repuestos_api.dtos.Cliente.ClienteRequestDto;
import com.ucr.repuestos_api.dtos.Cliente.ClienteResponseDto;
import com.ucr.repuestos_api.entities.Cliente.Cliente;
import com.ucr.repuestos_api.models.Cliente.ClienteRequestModel;
import com.ucr.repuestos_api.models.Cliente.ClienteResponseModel;

@Component
public class ClienteMapper {
    public ClienteResponseDto toClienteResponsiveDto(Cliente cliente) {

        isNull(cliente);

        return new ClienteResponseDto(
                cliente.getNombre(), cliente.getApellido1(), cliente.getApellido2(), cliente.getTelefono(),
                cliente.getFecha_registro());
    }

    public List<ClienteResponseDto> toClienteResponseDtoList(List<Cliente> clientes) {

        isNull(clientes);

        return clientes.stream()
                .map(this::toClienteResponsiveDto)
                .collect(Collectors.toList());
    }

    public ClienteResponseModel toClienteResponseModel(ClienteResponseDto clienteResponseDto) {

        isNull(clienteResponseDto);

        return new ClienteResponseModel(clienteResponseDto.nombre(), clienteResponseDto.apellido1(),
                clienteResponseDto.apellido2(), clienteResponseDto.telefono(), clienteResponseDto.fecha_registro());
    }

    public List<ClienteResponseModel> toClienteResponseModelList(List<ClienteResponseDto> clienteResponseDtos) {

        isNull(clienteResponseDtos);

        return clienteResponseDtos.stream()
                .map(this::toClienteResponseModel)
                .collect(Collectors.toList());
    }

    public ClienteRequestDto toClienteRequestDto(ClienteRequestModel clienteRequestModel) {
        isNull(clienteRequestModel);

        return new ClienteRequestDto(clienteRequestModel.nombre(), clienteRequestModel.apellido1(),
                clienteRequestModel.apellido2(), clienteRequestModel.telefono(), clienteRequestModel.correo(),
                clienteRequestModel.contrasena());
    }

    private <T> T isNull(T value) {
        if (value == null) {
            return value;
        }

        return null;
    }
}
