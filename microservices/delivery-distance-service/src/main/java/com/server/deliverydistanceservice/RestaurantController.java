package com.server.deliverydistanceservice;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
class RestaurantController {

    private DistanceService distanceService;

    @GetMapping("/restaurants/nearest/{cep}")
    public List<RestaurantWithDistanceDto> getNearestRestaurants(@PathVariable("cep") String cep) {
        return distanceService.getNearestRestaurants(cep);
    }

    @GetMapping("/restaurants/nearest/{cep}/cuisine-type/{cuisineTypeId}")
    public List<RestaurantWithDistanceDto> getNearestRestaurantsFilteredByCuisineType(@PathVariable("cep") String cep,
                                                                                      @PathVariable("cuisineTypeId") Long cuisineTypeId) {
        return distanceService.getNearestRestaurantsFilteredByCuisineType(cuisineTypeId, cep);
    }

    @GetMapping("/restaurants/{cep}/restaurant/{restaurantId}")
    public RestaurantWithDistanceDto getRestaurantDistance(@PathVariable("cep") String cep,
                                                           @PathVariable("restaurantId") Long restaurantId) {
        return distanceService.getRestaurantDistance(restaurantId, cep);
    }

}
