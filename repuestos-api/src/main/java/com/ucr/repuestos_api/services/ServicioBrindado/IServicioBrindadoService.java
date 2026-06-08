package com.ucr.repuestos_api.services.ServicioBrindado;

import java.util.List;

import com.ucr.repuestos_api.dtos.ServicioBrindado.ServicioBrindadoRequestDto;
import com.ucr.repuestos_api.entities.ServicioBrindado.ServicioBrindado;

public interface IServicioBrindadoService {

    List<ServicioBrindado> getByCliente(Integer idCliente);

    ServicioBrindado addServicioBrindado(ServicioBrindadoRequestDto servicioBrindadoRequestDto);

    ServicioBrindado updateServicioBrindado(Integer idServicioBrindado, ServicioBrindadoRequestDto servicioBrindadoRequestDto);

    void removeServicioBrindado(Integer idServicioBrindado);
}