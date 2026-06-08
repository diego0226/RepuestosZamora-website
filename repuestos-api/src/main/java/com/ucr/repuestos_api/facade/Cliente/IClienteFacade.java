package com.ucr.repuestos_api.facade.Cliente;

import java.util.List;

import com.ucr.repuestos_api.dtos.Cliente.ClienteRequestDto;
import com.ucr.repuestos_api.dtos.Cliente.ClienteResponseDto;

public interface IClienteFacade {
    List<ClienteResponseDto> getAll();

    ClienteResponseDto addCliente(ClienteRequestDto clienteRequestDto);

    ClienteResponseDto updateCliente(Integer id, ClienteRequestDto clienteRequestDto);

    void removeCliente(Integer id);
}
