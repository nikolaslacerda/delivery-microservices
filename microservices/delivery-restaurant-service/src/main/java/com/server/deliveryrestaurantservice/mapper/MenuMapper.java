package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.MenuDto;
import com.server.deliveryrestaurantservice.model.entity.Menu;

public class MenuMapper {

    public static MenuDto mapToDto(Menu menu) {
        return MenuDto.builder()
                .id(menu.getId())
                .categories(MenuCategoryMapper.mapListToDto(menu.getCategories()))
                .build();
    }


}
