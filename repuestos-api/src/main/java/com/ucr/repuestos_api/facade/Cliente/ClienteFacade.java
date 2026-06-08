package com.ucr.repuestos_api.facade.Cliente;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ucr.repuestos_api.dtos.Cliente.ClienteRequestDto;
import com.ucr.repuestos_api.dtos.Cliente.ClienteResponseDto;
import com.ucr.repuestos_api.mappers.Cliente.ClienteMapper;
import com.ucr.repuestos_api.services.Cliente.IClienteService;

import jakarta.transaction.Transactional;

@Component
public class ClienteFacade implements IClienteFacade {

    @Autowired
    private IClienteService clienteService;

    @Autowired
    private ClienteMapper clienteMapper;

    @Override
    public List<ClienteResponseDto> getAll() {
        return clienteMapper.toClienteResponseDtoList(clienteService.getAll());
    }

    @Override
    @Transactional
    public ClienteResponseDto addCliente(ClienteRequestDto clienteRequestDto) {
        var entity = clienteService.addCliente(clienteRequestDto);
        return clienteMapper.toClienteResponsiveDto(entity);
    }

    @Override
    @Transactional
    public ClienteResponseDto updateCliente(Integer id, ClienteRequestDto clienteRequestDto) {
        var entity = clienteService.updateCliente(id, clienteRequestDto);
        return clienteMapper.toClienteResponsiveDto(entity);
    }

    @Override
    public void removeCliente(Integer id) {
        clienteService.removeCliente(id);
    }

}
