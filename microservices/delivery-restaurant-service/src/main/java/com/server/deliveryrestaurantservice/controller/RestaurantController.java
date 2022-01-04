package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.exception.ResourceNotFoundException;
import com.server.deliveryrestaurantservice.integration.DistanceRestClient;
import com.server.deliveryrestaurantservice.mapper.RestaurantMapper;
import com.server.deliveryrestaurantservice.model.dto.RestaurantDto;
import com.server.deliveryrestaurantservice.model.entity.Menu;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.repository.MenuRepository;
import com.server.deliveryrestaurantservice.repository.RestaurantRepository;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
class RestaurantController {

    private MenuRepository menuRepository;
    private RestaurantRepository restaurantRepository;
    private DistanceRestClient distanceRestClient;

    @GetMapping("/restaurants/{id}")
    public RestaurantDto getRestaurantById(@PathVariable("id") Long id) {
        Restaurant restaurant = restaurantRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return RestaurantMapper.mapToDto(restaurant);
    }

//    @GetMapping("/partners/restaurants/user/{userId}")
//    public RestaurantDto getRestaurantByUser(@PathVariable("userId") Long userId) {
//        Restaurant restaurant = restaurantRepository.findByUserId(userId);
//        return RestaurantMapper.mapToDto(restaurant);
//    }

    @GetMapping("/partners/restaurants/user/{username}")
    public RestaurantDto getRestaurantByUsername(@PathVariable("username") String username) {
        Restaurant restaurant = restaurantRepository.findByUsername(username);
        return RestaurantMapper.mapToDto(restaurant);
    }

    @GetMapping("/restaurants")
    public List<RestaurantDto> getRestaurantsByIds(@RequestParam("ids") List<Long> ids) {
        return restaurantRepository.findAllById(ids)
                .stream()
                .map(RestaurantMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/partners/restaurants/{id}")
    public RestaurantDto getPartner(@PathVariable("id") Long id) {
        Restaurant restaurant = restaurantRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return RestaurantMapper.mapToDto(restaurant);
    }

    @PostMapping("/partners/restaurants")
    public RestaurantDto createRestaurant(@RequestBody Restaurant restaurant) {
        restaurant.setApproved(false);
        Restaurant createdRestaurant = restaurantRepository.save(restaurant);
        Menu menu = new Menu();
        menu.setRestaurant(createdRestaurant);
        menuRepository.save(menu);
        return RestaurantMapper.mapToDto(createdRestaurant);
    }

    @Transactional
    @PutMapping("/partners/restaurants/{id}")
    public RestaurantDto updateRestaurant(@RequestBody RestaurantDto restaurant) {
        Restaurant foundedRestaurant = restaurantRepository.findById(restaurant.getId())
                .orElseThrow(ResourceNotFoundException::new);
        Restaurant updatedRestaurant = restaurantRepository.save(RestaurantMapper.mapToModel(restaurant));
        if (compareCuisineTypeAndCep(restaurant, foundedRestaurant)) {
            distanceRestClient.updateRestaurantInDistanceService(updatedRestaurant);
        }
        return RestaurantMapper.mapToDto(updatedRestaurant);
    }

    @GetMapping("/admin/restaurants/pending")
    public List<RestaurantDto> getPendingApprovalRestaurants() {
        return restaurantRepository.findAllByApproved(false)
                .stream()
                .map(RestaurantMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    @PatchMapping("/admin/restaurants/{id}")
    public void approveRestaurant(@PathVariable("id") Long id) {
        restaurantRepository.approveById(id);
        Restaurant restaurant = restaurantRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        distanceRestClient.addRestaurantInDistanceService(restaurant);
    }

    private boolean compareCuisineTypeAndCep(RestaurantDto newRestaurant, Restaurant oldRestaurant) {
        return !newRestaurant.getCuisineTypeId().equals(oldRestaurant.getCuisineTypeId()) ||
                !newRestaurant.getCep().equals(oldRestaurant.getCep());
    }
}
