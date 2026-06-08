package com.ucr.repuestos_api.facade.ServicioBrindado;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ucr.repuestos_api.dtos.ServicioBrindado.ServicioBrindadoRequestDto;
import com.ucr.repuestos_api.dtos.ServicioBrindado.ServicioBrindadoResponseDto;
import com.ucr.repuestos_api.mappers.ServicioBrindado.ServicioBrindadoMapper;
import com.ucr.repuestos_api.services.ServicioBrindado.IServicioBrindadoService;

import jakarta.transaction.Transactional;

@Component
public class ServicioBrindadoFacade implements IServicioBrindadoFacade {

    @Autowired
    private IServicioBrindadoService servicioBrindadoService;

    @Autowired
    private ServicioBrindadoMapper servicioBrindadoMapper;

    @Override
    public List<ServicioBrindadoResponseDto> getByCliente(Integer idCliente) {
        return servicioBrindadoMapper.toServicioBrindadoResponseDtoList(
                servicioBrindadoService.getByCliente(idCliente));
    }

    @Override
    @Transactional
    public ServicioBrindadoResponseDto addServicioBrindado(ServicioBrindadoRequestDto servicioBrindadoRequestDto) {
        var entity = servicioBrindadoService.addServicioBrindado(servicioBrindadoRequestDto);
        return servicioBrindadoMapper.toServicioBrindadoResponseDto(entity);
    }

    @Override
    @Transactional
    public ServicioBrindadoResponseDto updateServicioBrindado(Integer idServicioBrindado, ServicioBrindadoRequestDto servicioBrindadoRequestDto) {
        var entity = servicioBrindadoService.updateServicioBrindado(idServicioBrindado, servicioBrindadoRequestDto);
        return servicioBrindadoMapper.toServicioBrindadoResponseDto(entity);
    }

    @Override
    public void removeServicioBrindado(Integer idServicioBrindado) {
        servicioBrindadoService.removeServicioBrindado(idServicioBrindado);
    }
}