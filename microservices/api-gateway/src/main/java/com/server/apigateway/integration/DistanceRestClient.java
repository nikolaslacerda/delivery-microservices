package com.server.apigateway.integration;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class DistanceRestClient {

    private final RestTemplate restTemplate;
    private final String distanceServiceUrl;

    DistanceRestClient(RestTemplate restTemplate,
                       @Value("${delivery.distance.service.url}") String distanceServiceUrl) {
        this.restTemplate = restTemplate;
        this.distanceServiceUrl = distanceServiceUrl;
    }

    @SuppressWarnings("unchecked")
    @HystrixCommand(fallbackMethod = "restaurantWithoutDistanceAndDetails")
    public Map<String, Object> byCepAndId(String cep, Long restaurantId) {
        String url = distanceServiceUrl + "/distances/restaurants/" + cep + "/restaurant/" + restaurantId;
        return restTemplate.getForObject(url, Map.class);
    }

    Map<String, Object> restaurantWithoutDistanceAndDetails(String cep, Long restaurantId) {
        Map<String, Object> result = new HashMap<>();
        result.put("restaurantId", restaurantId);
        result.put("cep", cep);
        return result;
    }

}
