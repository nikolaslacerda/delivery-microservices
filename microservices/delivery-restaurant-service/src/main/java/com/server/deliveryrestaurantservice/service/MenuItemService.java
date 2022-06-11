package com.server.deliveryrestaurantservice.service;

import com.server.deliveryrestaurantservice.exception.CategoryDisabledException;
import com.server.deliveryrestaurantservice.exception.MenuCategoryNotFoundException;
import com.server.deliveryrestaurantservice.exception.MenuItemNotFoundException;
import com.server.deliveryrestaurantservice.mapper.MenuItemMapper;
import com.server.deliveryrestaurantservice.model.dto.request.MenuItemRequest;
import com.server.deliveryrestaurantservice.model.dto.request.MenuItemUpdateRequest;
import com.server.deliveryrestaurantservice.model.dto.response.MenuItemResponse;
import com.server.deliveryrestaurantservice.model.entity.MenuCategory;
import com.server.deliveryrestaurantservice.model.entity.MenuItem;
import com.server.deliveryrestaurantservice.repository.MenuCategoryRepository;
import com.server.deliveryrestaurantservice.repository.MenuItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final MenuCategoryRepository menuCategoryRepository;

    public MenuItemResponse createMenuItem(Long categoryId, MenuItemRequest menuItemRequest) {
        MenuCategory menuCategory = menuCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new MenuCategoryNotFoundException(categoryId));
        MenuItem menuItem = MenuItem.builder()
                .name(menuItemRequest.getName())
                .description(menuItemRequest.getDescription())
                .imageUrl(Optional.ofNullable(menuItemRequest.getImageUrl()).orElse("default.png"))
                .price(menuItemRequest.getPrice())
                .promotionalPrice(menuItemRequest.getPromotionalPrice())
                .active(false)
                .category(menuCategory)
                .build();
        MenuItem menuItemCreated = menuItemRepository.save(menuItem);
        return MenuItemMapper.mapToDto(menuItemCreated);
    }

    public MenuItemResponse getMenuItemById(Long itemId) {
        MenuItem item = menuItemRepository.findById(itemId)
                .orElseThrow(() -> new MenuItemNotFoundException(itemId));
        return MenuItemMapper.mapToDto(item);
    }

    public MenuItemResponse updateMenuItem(Long itemId, MenuItemUpdateRequest menuItemRequest) {
        MenuItem menuItem = menuItemRepository.findById(itemId)
                .orElseThrow(() -> new MenuItemNotFoundException(itemId));
        Optional.ofNullable(menuItemRequest.getName()).ifPresent(menuItem::setName);
        Optional.ofNullable(menuItemRequest.getDescription()).ifPresent(menuItem::setDescription);
        Optional.ofNullable(menuItemRequest.getPrice()).ifPresent(menuItem::setPrice);
        Optional.ofNullable(menuItemRequest.getPromotionalPrice()).ifPresent(menuItem::setPromotionalPrice);
        Optional.ofNullable(menuItemRequest.getActive()).ifPresent(active -> updateItemStatus(menuItem, active));
        MenuItem updatedMenuItem = menuItemRepository.save(menuItem);
        return MenuItemMapper.mapToDto(updatedMenuItem);
    }

    private void updateItemStatus(MenuItem menuItem, boolean active) {
        if (menuItem.getActive() != active) {
            if (active) {
                if (!menuItem.getCategory().getActive()) {
                    throw new CategoryDisabledException();
                }
                menuItem.setActive(true);
            } else {
                boolean isLastActiveItemForCategory = menuItem.getCategory()
                        .getItems()
                        .stream()
                        .filter(MenuItem::getActive)
                        .count() == 1;
                if (isLastActiveItemForCategory) {
                    menuItem.getCategory().setActive(false);
                }
                menuItem.setActive(false);
            }
        }
    }

    public void deleteMenuItem(Long categoryId, Long itemId) {
        MenuCategory category = menuCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new MenuCategoryNotFoundException(categoryId));
        menuItemRepository.deleteById(itemId);
        if (category.getItems().isEmpty()) {
            category.setActive(false);
            menuCategoryRepository.save(category);
        }
    }
}
