package com.server.deliveryrestaurantservice.service;

import com.server.deliveryrestaurantservice.exception.ResourceNotFoundException;
import com.server.deliveryrestaurantservice.mapper.MenuItemMapper;
import com.server.deliveryrestaurantservice.model.dto.request.MenuItemRequest;
import com.server.deliveryrestaurantservice.model.dto.response.MenuItemResponse;
import com.server.deliveryrestaurantservice.model.entity.MenuCategory;
import com.server.deliveryrestaurantservice.model.entity.MenuItem;
import com.server.deliveryrestaurantservice.repository.MenuCategoryRepository;
import com.server.deliveryrestaurantservice.repository.MenuItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final MenuCategoryRepository menuCategoryRepository;

    public MenuItemResponse createMenuItem(Long categoryId, MenuItemRequest menuItem) {
        MenuCategory menuCategory = menuCategoryRepository.findById(categoryId)
                .orElseThrow(ResourceNotFoundException::new);
        MenuItem m = MenuItem.builder()
                .name(menuItem.getName())
                .description(menuItem.getDescription())
                .imageUrl(menuItem.getImageUrl())
                .price(menuItem.getPrice())
                .promotionalPrice(menuItem.getPromotionalPrice())
                .active(false)
                .category(menuCategory)
                .build();
        MenuItem menuItemCreated = menuItemRepository.save(m);
        return MenuItemMapper.mapToDto(menuItemCreated);
    }

    public MenuItemResponse getMenuItemById(Long itemId) {
        MenuItem item = menuItemRepository.findById(itemId)
                .orElseThrow(ResourceNotFoundException::new);
        return MenuItemMapper.mapToDto(item);
    }

    public MenuItemResponse updateMenuItem(Long itemId, MenuItemRequest menuItem) {
        MenuItem menuItem1 = menuItemRepository.findById(itemId)
                .orElseThrow(ResourceNotFoundException::new);
        MenuItem bookToUpdate = MenuItemMapper.mapToModel(menuItem);
        bookToUpdate.setId(menuItem1.getId());
        return MenuItemMapper.mapToDto(menuItemRepository.save(bookToUpdate));
    }

    public void deleteMenuItem(Long itemId) {
        menuItemRepository.deleteById(itemId);
    }
}
