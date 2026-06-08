package com.ucr.repuestos_api.services.ServicioBrindado;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.repuestos_api.Exceptions.ClienteNotFoundException;
import com.ucr.repuestos_api.Exceptions.RepuestoNotFoundException;
import com.ucr.repuestos_api.Exceptions.RepuestoOServicioRequeridoException;
import com.ucr.repuestos_api.Exceptions.ServicioBrindadoNotFoundException;
import com.ucr.repuestos_api.Exceptions.ServicioNotFoundException;
import com.ucr.repuestos_api.dtos.ServicioBrindado.ServicioBrindadoRequestDto;
import com.ucr.repuestos_api.entities.ServicioBrindado.ServicioBrindado;
import com.ucr.repuestos_api.repositories.Cliente.ClienteRepository;
import com.ucr.repuestos_api.repositories.Repuesto.RepuestoRepository;
import com.ucr.repuestos_api.repositories.Servicio.ServicioRepository;
import com.ucr.repuestos_api.repositories.ServicioBrindado.ServicioBrindadoRepository;

@Service
public class ServicioBrindadoService implements IServicioBrindadoService {

    @Autowired
    private ServicioBrindadoRepository servicioBrindadoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private RepuestoRepository repuestoRepository;

    @Autowired
    private ServicioRepository servicioRepository;

    @Override
    public List<ServicioBrindado> getByCliente(Integer idCliente) {
        return servicioBrindadoRepository.findByClienteIdCliente(idCliente);
    }

    @Override
    public ServicioBrindado addServicioBrindado(ServicioBrindadoRequestDto servicioBrindadoRequestDto) {

        if (servicioBrindadoRequestDto.getIdRepuesto() == null && servicioBrindadoRequestDto.getIdServicio() == null) {
            throw new RepuestoOServicioRequeridoException("Debe agregar un repuesto o un servicio");
        }

        var cliente = clienteRepository.findById(servicioBrindadoRequestDto.getIdCliente())
                .orElseThrow(() -> new ClienteNotFoundException("Cliente no encontrado"));

        Integer cantidad = servicioBrindadoRequestDto.getCantidadRepuestos() != null
                ? servicioBrindadoRequestDto.getCantidadRepuestos(): 0;

        var servicioBrindado = ServicioBrindado.builder()
                .cliente(cliente)
                .cantidadRepuestos(cantidad);

        if (servicioBrindadoRequestDto.getIdRepuesto() != null) {
            var repuesto = repuestoRepository.findById(servicioBrindadoRequestDto.getIdRepuesto())
                    .orElseThrow(() -> new RepuestoNotFoundException("Repuesto no encontrado"));

            servicioBrindado.repuesto(repuesto);
        }

        // 5. Si viene servicio, lo busco y lo agrego
        if (servicioBrindadoRequestDto.getIdServicio() != null) {
            var servicio = servicioRepository.findById(servicioBrindadoRequestDto.getIdServicio())
                    .orElseThrow(() -> new ServicioNotFoundException("Servicio no encontrado"));
            servicioBrindado.servicio(servicio);
        }

        return servicioBrindadoRepository.addServicioBrindado(servicioBrindado.build());
    }

    @Override
    public ServicioBrindado updateServicioBrindado(Integer idServicioBrindado, ServicioBrindadoRequestDto dto) {

        var item = servicioBrindadoRepository.findById(idServicioBrindado)
                .orElseThrow(() -> new ServicioBrindadoNotFoundException("Item del carrito no encontrado"));

        item.setCantidadRepuestos(dto.getCantidadRepuestos());

        return servicioBrindadoRepository.updateServicioBrindado(item);
    }

    @Override
    public void removeServicioBrindado(Integer idServicioBrindado) {
        var servicioBrindado = servicioBrindadoRepository.findById(idServicioBrindado)
                .orElseThrow(() -> new ServicioBrindadoNotFoundException("Item del carrito no encontrado"));
        servicioBrindadoRepository.delete(servicioBrindado);
    }
}