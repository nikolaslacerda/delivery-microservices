package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.response.CuisineTypeResponse;
import com.server.deliveryrestaurantservice.model.entity.CuisineType;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CuisineTypeMapper {

    public static CuisineTypeResponse mapToDto(CuisineType cuisineType) {
        return CuisineTypeResponse.builder()
                .name(cuisineType.getName())
                .build();
    }
}
