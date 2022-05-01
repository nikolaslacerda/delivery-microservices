package com.server.apigateway.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.netflix.hystrix.exception.HystrixBadRequestException;
import com.server.apigateway.exception.FeignClientException;
import feign.Response;
import feign.codec.ErrorDecoder;

import java.io.IOException;
import java.util.Map;

public class FeignErrorDecoder implements ErrorDecoder {

    @Override
    public Exception decode(String methodKey, Response response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> exceptionMessage = mapper.readValue(response.body().asInputStream(), Map.class);
            return new HystrixBadRequestException(exceptionMessage.get("message"));
        } catch (IOException e) {
            return new HystrixBadRequestException("Error");
        }
    }
}
