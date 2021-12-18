package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.exception.ResourceNotFoundException;
import com.server.deliveryrestaurantservice.mapper.MenuCategoryMapper;
import com.server.deliveryrestaurantservice.model.dto.MenuCategoryDto;
import com.server.deliveryrestaurantservice.model.entity.MenuCategory;
import com.server.deliveryrestaurantservice.repository.MenuCategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class MenuCategoryController {

    private MenuCategoryRepository menuCategoryRepository;

    @GetMapping("/restaurants/{idRestaurant}/menu/{idMenu}/category/{idCategory}")
    public MenuCategoryDto getCategoryById(@PathVariable("idCategory") Long idCategory) {
        MenuCategory category = menuCategoryRepository.findById(idCategory).orElseThrow(ResourceNotFoundException::new);
        return MenuCategoryMapper.mapToDto(category);
    }

    @PostMapping("/partners/restaurants/{idRestaurant}/menu/{idMenu}/category")
    public MenuCategoryDto createMenuCategory(@PathVariable("idMenu") Long idMenu,
                                              @RequestBody MenuCategory category) {
        return MenuCategoryMapper.mapToDto(menuCategoryRepository.save(category));
    }

}
