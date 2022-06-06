package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.model.dto.request.MenuCategoryRequest;
import com.server.deliveryrestaurantservice.model.dto.response.MenuCategoryResponse;
import com.server.deliveryrestaurantservice.service.MenuCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MenuCategoryController {

    private final MenuCategoryService menuCategoryService;

    @PostMapping("/partners/restaurants/{restaurantId}/menu/{menuId}/categories")
    public MenuCategoryResponse createCategory(@PathVariable Long menuId,
                                               @RequestBody MenuCategoryRequest request) {
        return menuCategoryService.createMenuCategory(menuId, request);
    }

    @GetMapping("/restaurants/{restaurantId}/menu/{menuId}/categories")
    public List<MenuCategoryResponse> listMenuCategories(@PathVariable Long menuId) {
        return menuCategoryService.listMenuCategoriesByMenuId(menuId);
    }

    @GetMapping("/restaurants/{restaurantId}/menu/{menuId}/categories/{categoryId}")
    public MenuCategoryResponse getMenuCategory(@PathVariable Long categoryId) {
        return menuCategoryService.getMenuCategoryById(categoryId);
    }

    @PatchMapping("/partners/restaurants/{restaurantId}/menu/{menuId}/categories/{categoryId}")
    public MenuCategoryResponse updateMenuCategory(@PathVariable Long categoryId,
                                                   @RequestBody MenuCategoryRequest request) {
        return menuCategoryService.updateMenuCategory(categoryId, request);
    }

    @DeleteMapping("/partners/restaurants/{restaurantId}/menu/{menuId}/categories/{categoryId}")
    public void deleteCategory(@PathVariable Long categoryId) {
        menuCategoryService.deleteMenuCategory(categoryId);
    }
}
