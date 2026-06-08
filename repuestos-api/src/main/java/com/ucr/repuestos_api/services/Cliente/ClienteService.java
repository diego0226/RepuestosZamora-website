package com.ucr.repuestos_api.services.Cliente;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.repuestos_api.Exceptions.ClienteNotFoundException;
import com.ucr.repuestos_api.dtos.Cliente.ClienteRequestDto;
import com.ucr.repuestos_api.entities.Cliente.Cliente;
import com.ucr.repuestos_api.repositories.Cliente.ClienteRepository;

@Service
public class ClienteService implements IClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public List<Cliente> getAll() {
        return clienteRepository.getAll();
    }

    @Override
    public Cliente addCliente(ClienteRequestDto clienteRequestDto) {
        var cliente = Cliente.builder()
                .nombre(clienteRequestDto.getNombre())
                .apellido1(clienteRequestDto.getApellido1())
                .apellido2(clienteRequestDto.getApellido2())
                .correo(clienteRequestDto.getCorreo())
                .contrasena(clienteRequestDto.getContrasena())
                .telefono(clienteRequestDto.getTelefono())
                .fecha_registro(LocalDate.now())
                .build();

        return clienteRepository.addCliente(cliente);
    }

    @Override
    public Cliente updateCliente(Integer id, ClienteRequestDto clienteRequestDto) {

        var cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ClienteNotFoundException("Cliente no encontrado"));
        cliente.setNombre(clienteRequestDto.getNombre());
        cliente.setApellido1(clienteRequestDto.getApellido1());
        cliente.setApellido2(clienteRequestDto.getApellido2());
        cliente.setTelefono(clienteRequestDto.getTelefono());
        cliente.setCorreo(clienteRequestDto.getCorreo());
        cliente.setContrasena(clienteRequestDto.getContrasena());

        return clienteRepository.updateCliente(cliente);
    }

    @Override
    public void removeCliente(Integer id) {
        var cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ClienteNotFoundException("Cliente no encontrado"));
        clienteRepository.delete(cliente);
    }

}
