package com.server.deliveryrestaurantservice.integration;

import com.server.deliveryrestaurantservice.mapper.RestaurantMapper;
import com.server.deliveryrestaurantservice.model.dto.RestaurantDistanceDto;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DistanceRestClient {

    private final String distanceServiceUrl;
    private final RestTemplate restTemplate;

    DistanceRestClient(RestTemplate restTemplate,
                       @Value("${delivery.distance.service.url}") String distanceServiceUrl) {
        this.distanceServiceUrl = distanceServiceUrl;
        this.restTemplate = restTemplate;
    }

    public void addRestaurantInDistanceService(Restaurant restaurant) {
        RestaurantDistanceDto restaurantDistanceDto = RestaurantMapper.mapToDistanceDto(restaurant);
        String url = distanceServiceUrl + "/restaurants";
        ResponseEntity<RestaurantDistanceDto> responseEntity =
                restTemplate.postForEntity(url, restaurantDistanceDto, RestaurantDistanceDto.class);
        HttpStatus statusCode = responseEntity.getStatusCode();
        if (!HttpStatus.CREATED.equals(statusCode)) {
            throw new RuntimeException("An error occurred when add restaurant: " + statusCode);
        }
    }

    public void updateRestaurantInDistanceService(Restaurant restaurant) {
        RestaurantDistanceDto restaurantDistanceDto = RestaurantMapper.mapToDistanceDto(restaurant);
        String url = distanceServiceUrl + "/restaurant/" + restaurant.getId();
        restTemplate.put(url, restaurantDistanceDto, RestaurantDistanceDto.class);
    }

}
