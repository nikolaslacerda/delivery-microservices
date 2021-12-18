package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.MenuItemDto;
import com.server.deliveryrestaurantservice.model.entity.MenuItem;

import java.util.List;
import java.util.stream.Collectors;

public class MenuItemMapper {

    public static MenuItemDto mapToDto(MenuItem item) {
        return MenuItemDto.builder()
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .promotionalPrice(item.getPromotionalPrice())
                .build();
    }

    public static List<MenuItemDto> mapListToDto(List<MenuItem> items) {
        return items.stream()
                .map(MenuItemMapper::mapToDto)
                .collect(Collectors.toList());
    }

}
