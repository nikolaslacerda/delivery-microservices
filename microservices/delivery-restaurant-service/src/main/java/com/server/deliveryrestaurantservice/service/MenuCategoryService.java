package com.server.deliveryrestaurantservice.service;

import com.server.deliveryrestaurantservice.exception.NoCategoryItemsException;
import com.server.deliveryrestaurantservice.exception.ResourceNotFoundException;
import com.server.deliveryrestaurantservice.mapper.MenuCategoryMapper;
import com.server.deliveryrestaurantservice.model.dto.request.MenuCategoryRequest;
import com.server.deliveryrestaurantservice.model.dto.response.MenuCategoryResponse;
import com.server.deliveryrestaurantservice.model.entity.Menu;
import com.server.deliveryrestaurantservice.model.entity.MenuCategory;
import com.server.deliveryrestaurantservice.repository.MenuCategoryRepository;
import com.server.deliveryrestaurantservice.repository.MenuRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MenuCategoryService {

    private final MenuRepository menuRepository;
    private final MenuCategoryRepository menuCategoryRepository;

    public MenuCategoryResponse createMenuCategory(Long menuId, MenuCategoryRequest category) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(ResourceNotFoundException::new);
        MenuCategory menuCategory = MenuCategory.builder()
                .name(category.getName())
                .menu(menu)
                .active(false)
                .build();
        MenuCategory createdMenuCategory = menuCategoryRepository.save(menuCategory);
        return MenuCategoryMapper.mapToDto(createdMenuCategory);
    }

    public List<MenuCategoryResponse> listMenuCategoriesByMenuId(Long menuId) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(ResourceNotFoundException::new);
        return menu.getCategories()
                .stream()
                .map(MenuCategoryMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public MenuCategoryResponse getMenuCategoryById(Long categoryId) {
        MenuCategory category = menuCategoryRepository.findById(categoryId)
                .orElseThrow(ResourceNotFoundException::new);
        return MenuCategoryMapper.mapToDto(category);
    }

    public MenuCategoryResponse updateMenuCategory(Long categoryId, MenuCategoryRequest request) {
        MenuCategory category = menuCategoryRepository.findById(categoryId)
                .orElseThrow(ResourceNotFoundException::new);
        Optional.ofNullable(request.getName()).ifPresent(category::setName);
        Optional.ofNullable(request.getActive()).ifPresent(active -> updateCategoryStatus(category, active));
        MenuCategory updatedRestaurant = menuCategoryRepository.save(category);
        return MenuCategoryMapper.mapToDto(updatedRestaurant);
    }

    public void deleteMenuCategory(Long categoryId) {
        menuCategoryRepository.deleteById(categoryId);
    }

    private void updateCategoryStatus(MenuCategory category, boolean active) {
        if (active) {
            if (category.getItems().isEmpty()) {
                throw new NoCategoryItemsException();
            }
            category.getItems().forEach(item -> item.setActive(true));
            category.setActive(true);
        } else {
            category.getItems().forEach(item -> item.setActive(false));
            category.setActive(false);
        }
    }
}
