package com.server.deliveryorderservice.exception;

import com.netflix.client.ClientException;
import com.server.deliveryorderservice.exception.model.ApiError;
import feign.FeignException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.util.NestedServletException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestControllerAdvice
public class OrderExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<Object> handleEntityNotFoundException(OrderNotFoundException exception) {
        return buildResponseEntity(
                HttpStatus.NOT_FOUND,
                exception.getMessage(),
                Collections.singletonList(exception.getMessage()));
    }

    @ExceptionHandler(FeignException.class)
    public ResponseEntity<Object> handleFeignException(FeignException exception) {
        if (exception.status() != -1) {
            return buildResponseEntity(
                    HttpStatus.valueOf(exception.status()),
                    exception.getMessage(),
                    Collections.singletonList(exception.getMessage()));
        } else {
            return buildResponseEntity(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    exception.getMessage(),
                    Collections.singletonList(exception.getMessage()));
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> internalServerErrorException(Exception exception) {
        return buildResponseEntity(
                HttpStatus.INTERNAL_SERVER_ERROR,
                exception.getMessage(),
                Collections.singletonList(exception.getMessage()));
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {
        List<String> errors = new ArrayList<>();
        exception.getBindingResult().getFieldErrors()
                .forEach(fieldError -> errors.add("Field " + fieldError.getField().toUpperCase() + " " + fieldError.getDefaultMessage()));
        exception.getBindingResult().getGlobalErrors()
                .forEach(globalErrors -> errors.add("Object " + globalErrors.getObjectName().toUpperCase() + " " + globalErrors.getDefaultMessage()));

        return buildResponseEntity(HttpStatus.BAD_REQUEST, "Informed argument(s) validation error(s)", errors);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException exception,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {
        return buildResponseEntity(
                HttpStatus.BAD_REQUEST,
                "Malformed JSON body and/or field error",
                Collections.singletonList(exception.getLocalizedMessage()));
    }

    private ResponseEntity<Object> buildResponseEntity(HttpStatus httpStatus,
                                                       String message,
                                                       List<String> errors) {
        ApiError apiError = ApiError.builder()
                .code(httpStatus.value())
                .status(httpStatus.getReasonPhrase())
                .message(message)
                .errors(errors)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(httpStatus).body(apiError);
    }
}
