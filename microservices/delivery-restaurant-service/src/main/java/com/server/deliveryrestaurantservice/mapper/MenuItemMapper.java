package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.request.MenuItemRequest;
import com.server.deliveryrestaurantservice.model.dto.response.MenuItemResponse;
import com.server.deliveryrestaurantservice.model.entity.MenuItem;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.util.ObjectUtils;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MenuItemMapper {

    public static MenuItemResponse mapToDto(MenuItem item) {
        return MenuItemResponse.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .imageUrl(item.getImageUrl())
                .price(item.getPrice())
                .promotionalPrice(item.getPromotionalPrice())
                .active(item.getActive())
                .build();
    }

    public static List<MenuItemResponse> mapListToDto(List<MenuItem> items) {
        if (ObjectUtils.isEmpty(items)) return Collections.emptyList();
        return items.stream()
                .map(MenuItemMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public static MenuItem mapToModel(MenuItemRequest menuItem) {
        return MenuItem.builder()
                .name(menuItem.getName())
                .description(menuItem.getDescription())
                .price(menuItem.getPrice())
                .promotionalPrice(menuItem.getPromotionalPrice())
                .active(false)
                .build();
    }
}
