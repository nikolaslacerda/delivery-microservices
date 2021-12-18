package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.RestaurantDistanceDto;
import com.server.deliveryrestaurantservice.model.dto.RestaurantDto;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;

public class RestaurantMapper {

    public static RestaurantDto mapToDto(Restaurant restaurant) {
        return RestaurantDto.builder()
                .id(restaurant.getId())
                .cnpj(restaurant.getCnpj())
                .name(restaurant.getName())
                .description(restaurant.getDescription())
                .cep(restaurant.getCep())
                .address(restaurant.getAddress())
                .deliveryPrice(restaurant.getDeliveryPrice())
                .cuisineTypeId(restaurant.getCuisineTypeId())
                .minDeliveryTime(restaurant.getMinDeliveryTime())
                .maxDeliveryTime(restaurant.getMaxDeliveryTime())
                .approved(restaurant.getApproved())
                .build();
    }

    public static RestaurantDistanceDto mapToDistanceDto(Restaurant restaurant) {
        return RestaurantDistanceDto.builder()
                .id(restaurant.getId())
                .cep(restaurant.getCep())
                .cuisineTypeId(restaurant.getCuisineTypeId())
                .build();
    }

    public static Restaurant mapToModel(RestaurantDto restaurantDto) {
        return Restaurant.builder()
                .cnpj(restaurantDto.getCnpj())
                .name(restaurantDto.getName())
                .description(restaurantDto.getDescription())
                .cep(restaurantDto.getCep())
                .address(restaurantDto.getAddress())
                .deliveryPrice(restaurantDto.getDeliveryPrice())
                .maxDeliveryTime(restaurantDto.getMaxDeliveryTime())
                .minDeliveryTime(restaurantDto.getMinDeliveryTime())
                .cuisineTypeId(restaurantDto.getCuisineTypeId())
                .build();
    }
}
