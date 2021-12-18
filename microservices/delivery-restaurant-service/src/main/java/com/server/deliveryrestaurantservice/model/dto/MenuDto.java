package com.server.deliveryrestaurantservice.model.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.server.deliveryrestaurantservice.model.entity.Menu;
import com.server.deliveryrestaurantservice.model.entity.MenuCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuDto {

	private Long id;
	private List<MenuCategoryDto> categories = new ArrayList<>();
}
