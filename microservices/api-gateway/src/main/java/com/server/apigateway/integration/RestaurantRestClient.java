package com.server.apigateway.integration;

import com.server.apigateway.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@FeignClient(name = "restaurant-service", configuration = FeignConfig.class)
public interface RestaurantRestClient {

    @GetMapping("/restaurants/{id}")
    Map<String, Object> byId(@PathVariable("id") Long id);
}
