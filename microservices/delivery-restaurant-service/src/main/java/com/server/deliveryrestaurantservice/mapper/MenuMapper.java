package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.response.MenuResponse;
import com.server.deliveryrestaurantservice.model.entity.Menu;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access= AccessLevel.PRIVATE)
public class MenuMapper {

    public static MenuResponse mapToDto(Menu menu) {
        return MenuResponse.builder()
                .id(menu.getId())
                .categories(MenuCategoryMapper.mapListToDto(menu.getCategories()))
                .build();
    }


}
