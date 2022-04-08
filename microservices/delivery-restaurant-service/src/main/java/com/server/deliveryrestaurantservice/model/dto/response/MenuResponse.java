package com.server.deliveryrestaurantservice.model.dto.response;

import java.util.ArrayList;
import java.util.List;

import com.server.deliveryrestaurantservice.model.dto.response.MenuCategoryResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuResponse {

	private Long id;
	private List<MenuCategoryResponse> categories = new ArrayList<>();
}
