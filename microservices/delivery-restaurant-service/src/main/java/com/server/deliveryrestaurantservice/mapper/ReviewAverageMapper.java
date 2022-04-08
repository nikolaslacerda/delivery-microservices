package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.response.ReviewAverageResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access= AccessLevel.PRIVATE)
public class ReviewAverageMapper {

    public static ReviewAverageResponse mapToDto(Double average) {
        return ReviewAverageResponse.builder()
                .average(average)
                .build();
    }

}
