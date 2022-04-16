package com.server.apigateway.exception;

import com.netflix.client.ClientException;
import com.netflix.zuul.exception.ZuulException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ClientException.class)
    public ResponseEntity<Object> handleClientException(ClientException exception, WebRequest request) {
        return buildResponseEntity(
                HttpStatus.NOT_FOUND,
                exception.getMessage(),
                Collections.singletonList(exception.getMessage()));
    }

    @ExceptionHandler(ZuulException.class)
    public ResponseEntity<Object> handleZuulException(ZuulException exception) {
        return buildResponseEntity(
                HttpStatus.NOT_FOUND,
                exception.getMessage(),
                Collections.singletonList(exception.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception exception) {
        return buildResponseEntity(
                HttpStatus.NOT_FOUND,
                exception.getMessage(),
                Collections.singletonList(exception.getMessage()));
    }

    private ResponseEntity<Object> buildResponseEntity(HttpStatus httpStatus, String message, List<String> errors) {
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
