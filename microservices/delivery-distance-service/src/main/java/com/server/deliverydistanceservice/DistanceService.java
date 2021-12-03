package com.server.deliverydistanceservice;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
class DistanceService {

    private static final Pageable LIMIT = PageRequest.of(0, 5);

    private RestaurantRepository restaurantRepository;

    public List<RestaurantWithDistanceDto> getNearestRestaurants(String cep) {
        List<Restaurant> restaurants = restaurantRepository.findAllByApproved(true, LIMIT).getContent();
        return calculateDistanceToAllRestaurants(restaurants, cep);
    }

    public List<RestaurantWithDistanceDto> getNearestRestaurantsFilteredByCuisineType(Long cuisineType, String cep) {
        List<Restaurant> restaurants = restaurantRepository.findAllByApprovedAndCuisineTypeId(true, cuisineType, LIMIT)
                .getContent();
        return calculateDistanceToAllRestaurants(restaurants, cep);
    }

    public RestaurantWithDistanceDto getRestaurantDistance(Long restaurantId, String cep) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(ResourceNotFoundException::new);
        String restaurantCep = restaurant.getCep();
        BigDecimal distance = getDistance(restaurantCep, cep);
        return new RestaurantWithDistanceDto(restaurantId, distance);
    }

    private List<RestaurantWithDistanceDto> calculateDistanceToAllRestaurants(List<Restaurant> restaurants, String cep) {
        return restaurants
                .stream()
                .map(restaurant -> {
                    String restaurantCep = restaurant.getCep();
                    BigDecimal distance = getDistance(restaurantCep, cep);
                    Long restaurantId = restaurant.getId();
                    return new RestaurantWithDistanceDto(restaurantId, distance);
                })
                .collect(Collectors.toList());
    }

    private BigDecimal getDistance(String restaurantCep, String cep) {
        return calculateDistance();
    }

    private BigDecimal calculateDistance() {
        //simulate();
        return BigDecimal.valueOf(Math.random() * 15);
    }

    @SuppressWarnings("unused")
    private void simulate() {
        long time = (long) (Math.random() * 10000 + 10000);
        try {
            Thread.sleep(time);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

}
