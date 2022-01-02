package com.server.apigateway.controller;

import com.server.apigateway.integration.DistanceRestClient;
import com.server.apigateway.integration.RestaurantRestClient;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@AllArgsConstructor
public class DistanceController {

    private RestaurantRestClient restaurantRestClient;
    private DistanceRestClient distanceRestClient;

    @GetMapping("/restaurants-with-distance/{cep}/restaurant/{restaurantId}")
    public Map<String, Object> byCepAndIdWithDistance(@PathVariable("cep") String cep,
                                                      @PathVariable("restaurantId") Long restaurantId) {
        Map<String, Object> restaurantData = restaurantRestClient.byId(restaurantId);
        restaurantData.forEach((x,y) -> System.out.println(x));
        Map<String, Object> distanceData = distanceRestClient.byCepAndId(cep, restaurantId);
        restaurantData.putAll(distanceData);
        return restaurantData;
    }

}
