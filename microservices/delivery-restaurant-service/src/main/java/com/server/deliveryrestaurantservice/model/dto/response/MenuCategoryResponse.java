package com.server.deliveryrestaurantservice.model.dto.response;

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
public class MenuCategoryResponse {

    private Long id;
    private String name;
    private Boolean active;
    private List<MenuItemResponse> items = new ArrayList<>();

}
