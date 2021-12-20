package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.ReviewAverageDto;

public class ReviewAverageMapper {

    public static ReviewAverageDto mapToDto(Long restaurantId, Double average) {
        return ReviewAverageDto.builder()
                .restaurantId(restaurantId)
                .average(average)
                .build();
    }

}
