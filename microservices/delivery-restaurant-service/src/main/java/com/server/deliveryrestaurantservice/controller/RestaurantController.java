package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.model.dto.request.RestaurantRequest;
import com.server.deliveryrestaurantservice.model.dto.response.RestaurantResponse;
import com.server.deliveryrestaurantservice.service.RestaurantService;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
class RestaurantController {

    private final RestaurantService restaurantService;

    @PostMapping("/partners/restaurants")
    public RestaurantResponse createRestaurant(@RequestBody RestaurantRequest restaurant) {
        return restaurantService.createRestaurant(restaurant);
    }

    @GetMapping("/restaurants")
    public List<RestaurantResponse> getRestaurants() {
        return restaurantService.getRestaurants();
    }

    @GetMapping("/restaurants/{id}")
    public RestaurantResponse getRestaurantById(@PathVariable("id") Long id) {
        return restaurantService.getRestaurantById(id);
    }

    @GetMapping("/partners/restaurants/user/{username}")
    public RestaurantResponse getRestaurantByUsername(@PathVariable("username") String username) {
        return restaurantService.getRestaurantByUsername(username);
    }

    @Transactional
    @PatchMapping("/partners/restaurants/{restaurantId}")
    public RestaurantResponse updateRestaurant(@PathVariable Long restaurantId,
                                               @RequestBody RestaurantRequest restaurantData) {
        return restaurantService.updateRestaurant(restaurantId, restaurantData);
    }

    @GetMapping("/admin/restaurants/pending")
    public List<RestaurantResponse> getPendingApprovalRestaurants() {
        return restaurantService.getPendingApprovalRestaurants();
    }

    @Transactional
    @PatchMapping("/admin/restaurants/{id}")
    public void approveRestaurant(@PathVariable("id") Long id) {
        restaurantService.approveRestaurant(id);
    }
}
