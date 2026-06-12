package com.ucr.repuestos_api.Exceptions;

// Excepción que se lanza al intentar registrar un cliente con un correo que ya existe
// en la base de datos. Extiende RuntimeException para seguir el mismo patrón que el resto
// de excepciones del proyecto (no es de tipo checked).
public class EmailAlreadyExistsException extends RuntimeException {

    // Constructor que recibe el mensaje de error y lo delega a la clase padre (RuntimeException)
    public EmailAlreadyExistsException(String message) {
        super(message);
    }

}
