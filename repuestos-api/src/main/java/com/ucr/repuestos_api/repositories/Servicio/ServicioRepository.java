package com.ucr.repuestos_api.repositories.Servicio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ucr.repuestos_api.entities.Servicio.Servicio;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Integer> {

    default List<Servicio> getAll() {
        return findAll();
    }
}
