package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.exception.ResourceNotFoundException;
import com.server.deliveryrestaurantservice.mapper.MenuItemMapper;
import com.server.deliveryrestaurantservice.model.dto.MenuItemDto;
import com.server.deliveryrestaurantservice.model.entity.MenuItem;
import com.server.deliveryrestaurantservice.repository.MenuItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class MenuItemController {

    private MenuItemRepository menuItemRepository;

    @PostMapping("/partners/restaurants/{idRestaurant}/menu/{idMenu}/category/{idCategory}/item")
    public MenuItemDto createMenuItem(@RequestBody MenuItem item) {
        return MenuItemMapper.mapToDto(menuItemRepository.save(item));
    }

    @PutMapping("/partners/restaurants/{idRestaurant}/menu/{idMenu}/category/{idCategory}/item/{idItem}")
    public MenuItemDto updateMenuItem(@RequestBody MenuItem item) {
        return MenuItemMapper.mapToDto(menuItemRepository.save(item));
    }

    @GetMapping("/partners/restaurants/{idRestaurant}/menu/{idMenu}/category/{idCategory}/item/{idItem}")
    public MenuItemDto getMenuItemById(@PathVariable("idItem") Long idItem) {
        MenuItem item = menuItemRepository.findById(idItem).orElseThrow(ResourceNotFoundException::new);
        return MenuItemMapper.mapToDto(item);
    }

    @DeleteMapping("/partners/restaurants/{idRestaurant}/menu/{idMenu}/category/{idCategory}/item/{idItem}")
    public void deleteMenuItem(@PathVariable("idItem") Long idItem) {
        menuItemRepository.deleteById(idItem);
    }

}
