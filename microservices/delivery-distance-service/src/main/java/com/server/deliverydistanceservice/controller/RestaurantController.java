package com.server.deliverydistanceservice.controller;

import com.server.deliverydistanceservice.exception.ResourceNotFoundException;
import com.server.deliverydistanceservice.model.Restaurant;
import com.server.deliverydistanceservice.repository.RestaurantRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/distances")
public class RestaurantController {

    private RestaurantRepository restaurantRepository;

    @PostMapping("/restaurants")
    public ResponseEntity<Restaurant> addRestaurant(@RequestBody Restaurant restaurant, UriComponentsBuilder uriBuilder) {
        log.info("Add new restaurant: " + restaurant);
        Restaurant salvo = restaurantRepository.insert(restaurant);
        UriComponents uriComponents = uriBuilder.path("/restaurants/{id}").buildAndExpand(salvo.getId());
        URI uri = uriComponents.toUri();
        return ResponseEntity.created(uri).contentType(MediaType.APPLICATION_JSON).body(salvo);
    }

    @PutMapping("/restaurants/{id}")
    public Restaurant updateRestaurant(@PathVariable("id") String id, @RequestBody Restaurant restaurant) {
        if (!restaurantRepository.existsById(id)) {
            throw new ResourceNotFoundException();
        }
        log.info("Update restaurant: " + restaurant);
        return restaurantRepository.save(restaurant);
    }
}
