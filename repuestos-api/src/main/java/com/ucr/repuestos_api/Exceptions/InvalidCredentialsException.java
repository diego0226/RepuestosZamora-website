package com.ucr.repuestos_api.Exceptions;

// Excepción que se lanza cuando las credenciales de inicio de sesión son incorrectas
// (el correo no existe o la contraseña no coincide). Extiende RuntimeException para no
// obligar a capturarla explícitamente, siguiendo el mismo patrón que las demás excepciones.
public class InvalidCredentialsException extends RuntimeException {

    // Constructor que recibe el mensaje de error y lo pasa a la clase padre (RuntimeException)
    public InvalidCredentialsException(String message) {
        super(message);
    }

}
