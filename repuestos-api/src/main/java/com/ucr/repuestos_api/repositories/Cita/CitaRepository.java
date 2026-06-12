package com.ucr.repuestos_api.repositories.Cita;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ucr.repuestos_api.entities.Cita.Cita;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Integer> {
    Optional<Cita> findById(Integer id);

    List<Cita> findByCliente_IdCliente(Integer idCliente);

    default List<Cita> getAll() {
        return findAll();
    }

    default Cita addProduct(Cita cita) {
        return save(cita);
    }

    default Cita updateCita(Cita cita) {
        return save(cita);
    }
}
