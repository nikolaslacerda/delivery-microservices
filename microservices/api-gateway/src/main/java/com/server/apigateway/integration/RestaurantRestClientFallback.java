package com.server.apigateway.integration;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class RestaurantRestClientFallback implements RestaurantRestClient {

    @Override
    public Map<String, Object> byId(Long id) {
        Map<String, Object> result = new HashMap<>();
        result.put("id", id);
        return result;
    }

}
