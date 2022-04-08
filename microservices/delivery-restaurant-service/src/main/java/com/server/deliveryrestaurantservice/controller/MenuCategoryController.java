package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.model.dto.request.MenuCategoryRequest;
import com.server.deliveryrestaurantservice.model.dto.response.MenuCategoryResponse;
import com.server.deliveryrestaurantservice.service.MenuCategoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class MenuCategoryController {

    private final MenuCategoryService menuCategoryService;

    @PostMapping("/partners/restaurants/{restaurantId}/menu/{menuId}/categories") //ok
    public MenuCategoryResponse createCategory(@PathVariable Long menuId, @RequestBody MenuCategoryRequest request) {
        return menuCategoryService.createMenuCategory(menuId, request);
    }

    @GetMapping("/restaurants/{restaurantId}/menu/{menuId}/categories") //ok
    public List<MenuCategoryResponse> getMenuCategories(@PathVariable("menuId") Long menuId) {
        return menuCategoryService.getMenuCategoriesByMenuId(menuId);
    }

    @GetMapping("/restaurants/{restaurantId}/menu/{menuId}/categories/{categoryId}")
    public MenuCategoryResponse getCategory(@PathVariable("categoryId") Long categoryId) {
        return menuCategoryService.getMenuCategoryById(categoryId);
    }

    @PatchMapping("/partners/restaurants/{restaurantId}/menu/{menuId}/categories/{categoryId}") //ok
    public MenuCategoryResponse editCategory(@PathVariable Long categoryId, @RequestBody MenuCategoryRequest request) {
        return menuCategoryService.updateMenuCategory(categoryId, request);
    }

    @DeleteMapping("/partners/restaurants/{restaurantId}/menu/{menuId}/categories/{categoryId}") //ok
    public void deleteCategory(@PathVariable Long categoryId) {
        menuCategoryService.deleteMenuCategory(categoryId);
    }
}
