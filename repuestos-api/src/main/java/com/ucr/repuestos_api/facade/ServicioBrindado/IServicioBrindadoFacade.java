package com.ucr.repuestos_api.facade.ServicioBrindado;

import java.util.List;

import com.ucr.repuestos_api.dtos.ServicioBrindado.ServicioBrindadoRequestDto;
import com.ucr.repuestos_api.dtos.ServicioBrindado.ServicioBrindadoResponseDto;

public interface IServicioBrindadoFacade {

    List<ServicioBrindadoResponseDto> getByCliente(Integer idCliente);

    ServicioBrindadoResponseDto addServicioBrindado(ServicioBrindadoRequestDto servicioBrindadoRequestDto);

    ServicioBrindadoResponseDto updateServicioBrindado(Integer idServicioBrindado, ServicioBrindadoRequestDto servicioBrindadoRequestDto);

    void removeServicioBrindado(Integer idServicioBrindado);
}