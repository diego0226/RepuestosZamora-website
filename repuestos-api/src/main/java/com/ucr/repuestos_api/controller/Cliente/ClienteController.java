package com.ucr.repuestos_api.controller.Cliente;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucr.repuestos_api.dtos.Cliente.ClienteResponseDto;
import com.ucr.repuestos_api.facade.Cliente.IClienteFacade;
import com.ucr.repuestos_api.mappers.Cliente.ClienteMapper;
import com.ucr.repuestos_api.models.Cliente.ClientePerfilRequestModel;
import com.ucr.repuestos_api.models.Cliente.ClienteRequestModel;
import com.ucr.repuestos_api.models.Cliente.ClienteResponseModel;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cliente")
public class ClienteController {

    @Autowired
    private IClienteFacade clienteFacade;

    @Autowired
    private ClienteMapper clienteMapper;

    @GetMapping
    public ResponseEntity<List<ClienteResponseModel>> findAll() {
        return ResponseEntity.ok(clienteMapper.toClienteResponseModelList(clienteFacade.getAll()));
    }

    @PostMapping
    public ClienteResponseDto save(@Valid @RequestBody ClienteRequestModel clienteRequestModel) {
        var dto = clienteMapper.toClienteRequestDto(clienteRequestModel);
        return clienteFacade.addCliente(dto);
    }

    @PutMapping(path = "/{id}")
    public ClienteResponseDto update(@PathVariable("id") Integer id,@Valid @RequestBody ClienteRequestModel clienteRequestModel) {
        var dto = clienteMapper.toClienteRequestDto(clienteRequestModel);
        return clienteFacade.updateCliente(id, dto);
    }

    // Edición del perfil del cliente (solo correo y teléfono), sin requerir la contraseña.
    @PutMapping(path = "/{id}/perfil")
    public ClienteResponseDto updatePerfil(@PathVariable("id") Integer id,
            @Valid @RequestBody ClientePerfilRequestModel clientePerfilRequestModel) {
        var dto = clienteMapper.toClientePerfilRequestDto(clientePerfilRequestModel);
        return clienteFacade.updatePerfil(id, dto);
    }

     @DeleteMapping(path =  "/{id}")
    public void remove(@PathVariable("id") Integer id){
        clienteFacade.removeCliente(id);
    }
}
