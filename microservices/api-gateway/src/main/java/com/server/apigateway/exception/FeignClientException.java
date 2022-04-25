package com.server.apigateway.exception;

public class FeignClientException extends RuntimeException {

    private Long code;

    public FeignClientException(String message, Long code) {
        super(message);
        this.code = code;
    }

    public Long getCode() {
        return code;
    }

}
