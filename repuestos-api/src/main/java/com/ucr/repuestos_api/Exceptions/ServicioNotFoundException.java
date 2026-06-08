package com.ucr.repuestos_api.Exceptions;

public class ServicioNotFoundException extends RuntimeException {
    public ServicioNotFoundException(String message) {
        super(message);
    }
}
