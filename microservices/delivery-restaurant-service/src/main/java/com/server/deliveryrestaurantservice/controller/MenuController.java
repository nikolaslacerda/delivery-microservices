package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.model.dto.response.MenuResponse;
import com.server.deliveryrestaurantservice.service.MenuService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class MenuController {

    private final MenuService menuService;

    // Change to only active=true
    @GetMapping("/restaurants/{restaurantId}/menu")
    public MenuResponse getMenuByRestaurantId(@PathVariable Long restaurantId) {
        return menuService.getMenuByRestaurantId(restaurantId);
    }


}
