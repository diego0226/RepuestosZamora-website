package com.ucr.repuestos_api.repositories.Cliente;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ucr.repuestos_api.entities.Cliente.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    Optional<Cliente> findById(Integer id_cliente);

    default List<Cliente> getAll() {
        return findAll();
    }

    default Cliente addCliente(Cliente cliente) {
        return save(cliente);
    }

    default Cliente updateCliente(Cliente cliente) {
        return save(cliente);
    }
}
