package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.ReviewDto;
import com.server.deliveryrestaurantservice.model.entity.Review;

public class ReviewMapper {

    public static ReviewDto mapToDto(Review review) {
        return ReviewDto.builder()
                .id(review.getId())
                .score(review.getScore())
                .comment(review.getComment())
                .build();
    }
}
