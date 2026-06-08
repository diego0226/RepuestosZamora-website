package com.ucr.repuestos_api.repositories.Repuesto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ucr.repuestos_api.entities.Repuesto.Repuesto;

public interface RepuestoRepository extends JpaRepository<Repuesto, Integer>{
    default List<Repuesto> getAll(){
        return findAll();
    }
} 