package com.ucr.repuestos_api.entities.ServicioBrindado;

import com.ucr.repuestos_api.entities.Cliente.Cliente;
import com.ucr.repuestos_api.entities.Repuesto.Repuesto;
import com.ucr.repuestos_api.entities.Servicio.Servicio;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;              
import jakarta.persistence.JoinColumn;       
import jakarta.persistence.ManyToOne;       
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="servicioBrindado")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServicioBrindado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_servicioBrindado")
    private Integer idServicioBrindado;

    @ManyToOne
    @JoinColumn(name = "id_repuesto", nullable = true)
    private Repuesto repuesto;

    @Column(name = "cantidad_repuestos", nullable = true)
    private Integer cantidadRepuestos;

    @ManyToOne
    @JoinColumn(name = "id_servicio", nullable = true)
    private Servicio servicio;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;
}