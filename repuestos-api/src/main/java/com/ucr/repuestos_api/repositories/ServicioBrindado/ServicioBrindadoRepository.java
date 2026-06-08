package com.ucr.repuestos_api.repositories.ServicioBrindado;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ucr.repuestos_api.entities.ServicioBrindado.ServicioBrindado;

@Repository
public interface ServicioBrindadoRepository extends JpaRepository<ServicioBrindado, Integer> {

    Optional<ServicioBrindado> findById(Integer idServicioBrindado);

    List<ServicioBrindado> findByClienteIdCliente(Integer idCliente);

    default ServicioBrindado addServicioBrindado(ServicioBrindado servicioBrindado) {
        return save(servicioBrindado);
    }

    default ServicioBrindado updateServicioBrindado(ServicioBrindado servicioBrindado) {
        return save(servicioBrindado);
    }
}