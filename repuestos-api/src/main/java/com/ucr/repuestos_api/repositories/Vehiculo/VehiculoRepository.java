package com.ucr.repuestos_api.repositories.Vehiculo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ucr.repuestos_api.entities.Vehiculo.Vehiculo;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, String> {

    Optional<Vehiculo> findById(String placa);

    default List<Vehiculo> getAll() {
        return findAll();
    }

    default Vehiculo addVehiculo(Vehiculo vehiculo) {
        return save(vehiculo);
    }

    default Vehiculo updateVehiculo(Vehiculo vehiculo) {
        return save(vehiculo);
    }
}
