package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.response.RestaurantResponse;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.model.dto.request.RestaurantRequest;
import com.server.deliveryrestaurantservice.model.entity.Review;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor(access= AccessLevel.PRIVATE)
public class RestaurantMapper {

    public static RestaurantResponse mapToDto(Restaurant restaurant) {
        return RestaurantResponse.builder()
                .id(restaurant.getId())
                .cnpj(restaurant.getCnpj())
                .name(restaurant.getName())
                .address(AddressMapper.mapToDto(restaurant.getAddress()))
                .imageUrl(restaurant.getImageUrl())
                .description(restaurant.getDescription())
                .deliveryFee(restaurant.getDeliveryPrice())
                .mainCategory(restaurant.getCuisineType().getName())
                .minDeliveryTime(restaurant.getMinDeliveryTime())
                .maxDeliveryTime(restaurant.getMaxDeliveryTime())
                .active(restaurant.getActive())
                .userRating(getReviewAverage(restaurant.getReviews()))
                .build();
    }

    private static Double getReviewAverage(List<Review> reviews) {
        return reviews.stream()
                .mapToDouble(Review::getUserRating)
                .average()
                .orElse(0);
    }

    public static Restaurant mapToModel(RestaurantRequest restaurantDto) {
        return Restaurant.builder()
                .cnpj(restaurantDto.getCnpj())
                .name(restaurantDto.getName())
                .description(restaurantDto.getDescription())
                .active(false)
                .createdAt(LocalDate.now())
                .deliveryPrice(restaurantDto.getDeliveryPrice())
                .maxDeliveryTime(restaurantDto.getMaxDeliveryTime())
                .minDeliveryTime(restaurantDto.getMinDeliveryTime())
                .partnerId(restaurantDto.getPartnerId())
                .build();
    }
}
