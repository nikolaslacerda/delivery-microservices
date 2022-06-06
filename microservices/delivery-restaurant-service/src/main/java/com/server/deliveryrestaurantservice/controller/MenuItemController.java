package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.model.dto.request.MenuItemRequest;
import com.server.deliveryrestaurantservice.model.dto.request.MenuItemUpdateRequest;
import com.server.deliveryrestaurantservice.model.dto.response.MenuItemResponse;
import com.server.deliveryrestaurantservice.service.MenuItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class MenuItemController {

    private final MenuItemService menuItemService;

    @PostMapping("/partners/restaurants/{restaurantId}/categories/{categoryId}/items")
    public MenuItemResponse createMenuItem(@PathVariable Long categoryId,
                                           @Valid @RequestBody MenuItemRequest request) {
        return menuItemService.createMenuItem(categoryId, request);
    }

    @GetMapping("/partners/restaurants/{restaurantId}/categories/{categoryId}/items/{itemId}")
    public MenuItemResponse getMenuItemById(@PathVariable Long itemId) {
        return menuItemService.getMenuItemById(itemId);
    }

    @PatchMapping("/partners/restaurants/{restaurantId}/categories/{categoryId}/items/{itemId}")
    public MenuItemResponse updateMenuItem(@PathVariable Long itemId,
                                           @Valid @RequestBody MenuItemUpdateRequest menuItemRequest) {
        return menuItemService.updateMenuItem(itemId, menuItemRequest);
    }

    @DeleteMapping("/partners/restaurants/{restaurantId}/categories/{categoryId}/items/{itemId}")
    public void deleteMenuItem(@PathVariable Long categoryId,
                               @PathVariable Long itemId) {
        menuItemService.deleteMenuItem(categoryId, itemId);
    }

}
