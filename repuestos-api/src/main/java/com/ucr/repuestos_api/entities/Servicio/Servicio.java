package com.ucr.repuestos_api.entities.Servicio;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "servicio")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_servicio")
    private Integer idServicio;

    @Column(name = "nombre_servicio")
    private String nombreServicio;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "precio")
    private BigDecimal precio;
}
