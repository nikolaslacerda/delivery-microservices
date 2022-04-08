package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.response.MenuCategoryResponse;
import com.server.deliveryrestaurantservice.model.entity.MenuCategory;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MenuCategoryMapper {

    public static MenuCategoryResponse mapToDto(MenuCategory category) {
        return MenuCategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .active(category.getActive())
                .items(MenuItemMapper.mapListToDto(category.getItems()))
                .build();
    }

    public static List<MenuCategoryResponse> mapListToDto(List<MenuCategory> categories) {
        return categories.stream()
                .map(MenuCategoryMapper::mapToDto)
                .collect(Collectors.toList());
    }

}
