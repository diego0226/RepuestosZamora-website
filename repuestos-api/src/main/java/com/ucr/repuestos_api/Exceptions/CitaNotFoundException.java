package com.ucr.repuestos_api.Exceptions;

public class CitaNotFoundException extends RuntimeException{
    public CitaNotFoundException(String message){
        super(message);
    }
}
