package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.request.ReviewRequest;
import com.server.deliveryrestaurantservice.model.dto.response.ReviewResponse;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.model.entity.Review;

import java.time.LocalDate;

public class ReviewMapper {

    public static ReviewResponse mapToDto(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .name(review.getName())
                .userRating(review.getUserRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .orderId(review.getOrderId())
                .restaurantId(review.getRestaurant().getId())
                .build();
    }

    public static Review mapToModel(Restaurant restaurant, ReviewRequest review) {
        return Review.builder()
                .name(review.getName())
                .userRating(review.getUserRating())
                .comment(review.getComment())
                .createdAt(LocalDate.now())
                .orderId(review.getOrderId())
                .restaurant(restaurant)
                .build();
    }
}
