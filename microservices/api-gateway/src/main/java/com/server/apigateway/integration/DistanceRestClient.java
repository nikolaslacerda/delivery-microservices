package com.server.apigateway.integration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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
    public Map<String, Object> byCepAndId(String cep, Long restaurantId) {
        String url = distanceServiceUrl + "/restaurants/" + cep + "/restaurant/" + restaurantId;
        return restTemplate.getForObject(url, Map.class);
    }

}
