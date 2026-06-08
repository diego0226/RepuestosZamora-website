package com.ucr.repuestos_api.repositories.Empleado;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ucr.repuestos_api.entities.Empleado.Empleado;
import com.ucr.repuestos_api.entities.Servicio.Servicio;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Integer> {

    Optional<Empleado> findById(Integer id);

    Optional<Empleado> findByServicio(Servicio servicio);

    default List<Empleado> getAll() {
        return findAll();
    }
}
