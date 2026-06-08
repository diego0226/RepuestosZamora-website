package com.ucr.repuestos_api.Exceptions;

public class RepuestoNotFoundException extends RuntimeException {
    public RepuestoNotFoundException(String message){
        super(message);
    }
}
