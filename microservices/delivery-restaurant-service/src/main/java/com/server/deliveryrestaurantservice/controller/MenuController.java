package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.exception.ResourceNotFoundException;
import com.server.deliveryrestaurantservice.mapper.MenuMapper;
import com.server.deliveryrestaurantservice.model.dto.MenuDto;
import com.server.deliveryrestaurantservice.model.entity.Menu;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.repository.MenuRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class MenuController {

    private MenuRepository menuRepository;

    @GetMapping("/restaurants/{idRestaurant}/menu")
    public MenuDto getMenuByRestaurant(@PathVariable("idRestaurant") Long idRestaurant) {
        Restaurant restaurant = new Restaurant();
        restaurant.setId(idRestaurant);
        Menu menu = menuRepository.findByRestaurant(restaurant);
        return MenuMapper.mapToDto(menu);
    }

    @GetMapping("/restaurants/{idRestaurant}/menu/{idMenu}")
    public MenuDto getMenuById(@PathVariable("idMenu") Long idMenu) {
        Menu menu = menuRepository.findById(idMenu).orElseThrow(ResourceNotFoundException::new);
        return MenuMapper.mapToDto(menu);
    }

}
