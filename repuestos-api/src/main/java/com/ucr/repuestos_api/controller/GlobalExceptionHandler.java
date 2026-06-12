package com.ucr.repuestos_api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ucr.repuestos_api.Exceptions.CitaNotFoundException;
import com.ucr.repuestos_api.Exceptions.ClienteNotFoundException;
import com.ucr.repuestos_api.Exceptions.EmailAlreadyExistsException;
import com.ucr.repuestos_api.Exceptions.InvalidCredentialsException;
import com.ucr.repuestos_api.Exceptions.EmpleadoNotFoundException;
import com.ucr.repuestos_api.Exceptions.RepuestoNotFoundException;
import com.ucr.repuestos_api.Exceptions.RepuestoOServicioRequeridoException;
import com.ucr.repuestos_api.Exceptions.ServicioBrindadoNotFoundException;
import com.ucr.repuestos_api.Exceptions.ServicioNotFoundException;
import com.ucr.repuestos_api.Exceptions.VehiculoNotFoundException;
import com.ucr.repuestos_api.dtos.ErrorDto;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CitaNotFoundException.class)
    public ResponseEntity<ErrorDto> handleCitaNotFoundException(CitaNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDto(404, ex.getMessage()));
    }

    @ExceptionHandler(ClienteNotFoundException.class)
    public ResponseEntity<ErrorDto> handleClienteNotFoundException(ClienteNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDto(404, ex.getMessage()));
    }

    @ExceptionHandler(VehiculoNotFoundException.class)
    public ResponseEntity<ErrorDto> handleVehiculoNotFoundException(VehiculoNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDto(404, ex.getMessage()));
    }

    @ExceptionHandler(EmpleadoNotFoundException.class)
    public ResponseEntity<ErrorDto> handleEmpleadoNotFoundException(EmpleadoNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDto(404, ex.getMessage()));
    }

    @ExceptionHandler(ServicioNotFoundException.class)
    public ResponseEntity<ErrorDto> handleServicioNotFoundException(ServicioNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDto(404, ex.getMessage()));
    }

    @ExceptionHandler(RepuestoNotFoundException.class)
    public ResponseEntity<ErrorDto> handleRespuestoNotFoundException(RepuestoNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDto(404, ex.getMessage()));
    }


    @ExceptionHandler(ServicioBrindadoNotFoundException.class)
    public ResponseEntity<ErrorDto> handleServicioBrindadoNotFoundException(ServicioBrindadoNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDto(404, ex.getMessage()));
    }

    @ExceptionHandler(RepuestoOServicioRequeridoException.class)
    public ResponseEntity<ErrorDto> handleRepuestoOServicioRequeridoException(RepuestoOServicioRequeridoException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorDto(400, ex.getMessage()));
    }

    // Maneja el error de credenciales inválidas en el login y responde con 401 Unauthorized
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorDto> handleInvalidCredentialsException(InvalidCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorDto(401, ex.getMessage()));
    }

    // Maneja el error de correo ya registrado en el registro y responde con 409 Conflict
    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorDto> handleEmailAlreadyExistsException(EmailAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorDto(409, ex.getMessage()));
    }

}
