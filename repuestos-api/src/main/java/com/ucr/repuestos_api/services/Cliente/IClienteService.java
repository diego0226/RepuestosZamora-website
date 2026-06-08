package com.ucr.repuestos_api.services.Cliente;

import java.util.List;

import com.ucr.repuestos_api.dtos.Cliente.ClienteRequestDto;
import com.ucr.repuestos_api.entities.Cliente.Cliente;

public interface IClienteService {
    List<Cliente> getAll();

    Cliente addCliente(ClienteRequestDto clienteRequestDto);

    Cliente updateCliente(Integer id, ClienteRequestDto clienteRequestDto);

    void removeCliente(Integer id);
}
