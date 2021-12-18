package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.MenuCategoryDto;
import com.server.deliveryrestaurantservice.model.entity.MenuCategory;

import java.util.List;
import java.util.stream.Collectors;

public class MenuCategoryMapper {

    public static MenuCategoryDto mapToDto(MenuCategory category) {
        return MenuCategoryDto.builder()
                .id(category.getId())
                .nome(category.getName())
                .items(MenuItemMapper.mapListToDto(category.getItems()))
                .build();
    }

    public static List<MenuCategoryDto> mapListToDto(List<MenuCategory> categories) {
        return categories.stream()
                .map(MenuCategoryMapper::mapToDto)
                .collect(Collectors.toList());
    }

}
