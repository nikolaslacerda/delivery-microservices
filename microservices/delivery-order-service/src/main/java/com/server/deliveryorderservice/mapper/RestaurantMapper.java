package com.server.deliveryorderservice.mapper;

import com.server.deliveryorderservice.model.dto.RestaurantDto;
import com.server.deliveryorderservice.model.entity.Restaurant;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RestaurantMapper {

    public static Restaurant mapToModel(RestaurantDto restaurantDto) {
        return Restaurant.builder()
                .id(restaurantDto.getId())
                .address(AddressMapper.mapToModel(restaurantDto.getAddress()))
                .logo(restaurantDto.getLogo())
                .name(restaurantDto.getName())
                .phoneNumber(restaurantDto.getPhoneNumber())
                .build();
    }
}
