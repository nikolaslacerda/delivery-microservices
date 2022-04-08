package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.model.dto.request.MenuItemRequest;
import com.server.deliveryrestaurantservice.model.dto.response.MenuItemResponse;
import com.server.deliveryrestaurantservice.service.MenuItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class MenuItemController {

    private final MenuItemService menuItemService;

    @PostMapping("/partners/restaurants/{restaurantId}/menu/category/{categoryId}/item")
    public MenuItemResponse createMenuItem(@PathVariable Long categoryId,
                                           @RequestBody MenuItemRequest request) {
        return menuItemService.createMenuItem(categoryId, request);
    }

    @GetMapping("/partners/restaurants/{restaurantId}/menu/category/{categoryId}/item/{itemId}")
    public MenuItemResponse getMenuItemById(@PathVariable("itemId") Long itemId) {
        return menuItemService.getMenuItemById(itemId);
    }

    @PutMapping("/partners/restaurants/{restaurantId}/menu/category/{categoryId}/item/{itemId}")
    public MenuItemResponse updateMenuItem(@PathVariable("itemId") Long itemId,
                                           @RequestBody MenuItemRequest request) {
        return menuItemService.updateMenuItem(itemId, request);
    }

    @DeleteMapping("/partners/restaurants/{restaurantId}/menu/category/{categoryId}/item/{itemId}")
    public void deleteMenuItem(@PathVariable("itemId") Long itemId) {
        menuItemService.deleteMenuItem(itemId);
    }

}
