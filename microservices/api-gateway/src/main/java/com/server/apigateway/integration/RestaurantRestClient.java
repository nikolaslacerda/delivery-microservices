package com.server.apigateway.integration;

import com.server.apigateway.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;
import java.util.UUID;

@FeignClient(name = "restaurant-service", configuration = FeignConfig.class)
public interface RestaurantRestClient {

    @GetMapping("/restaurants/{id}")
    Map<String, Object> byId(@PathVariable("id") Long id);

    @GetMapping("/partners/restaurants/user/{userUUID}")
    Map<String, Object> getRestaurantByUsername(@PathVariable("userUUID") UUID userUUID);
}
