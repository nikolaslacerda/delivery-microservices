package com.server.deliveryorderservice.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.deliveryorderservice.exception.CustomFeignException;
import feign.Response;
import feign.codec.ErrorDecoder;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

public class RetrieveMessageErrorDecoder implements ErrorDecoder {

    @Override
    public Exception decode(String methodKey, Response response) {
        String message;
        try (InputStream bodyIs = response.body().asInputStream()) {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> exceptionMessage = mapper.readValue(bodyIs, Map.class);
            message = exceptionMessage.get("message");
        } catch (IOException e) {
            return new Exception(e.getMessage());
        }
        return new CustomFeignException(response.status(), message);
    }
}
