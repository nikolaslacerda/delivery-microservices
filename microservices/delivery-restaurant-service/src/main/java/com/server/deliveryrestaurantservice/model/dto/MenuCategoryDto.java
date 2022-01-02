package com.server.deliveryrestaurantservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuCategoryDto {

    private Long id;
    private String name;
    private List<MenuItemDto> items = new ArrayList<>();

}
