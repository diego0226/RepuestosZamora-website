package com.ucr.repuestos_api.Exceptions;

public class ClienteNotFoundException extends RuntimeException {
    
    public ClienteNotFoundException(String message){
        super(message);
    }
    
}
