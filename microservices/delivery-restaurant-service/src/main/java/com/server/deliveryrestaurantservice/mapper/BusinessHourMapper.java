package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.request.BusinessHoursUpdateRequest;
import com.server.deliveryrestaurantservice.model.dto.response.BusinessHoursResponse;
import com.server.deliveryrestaurantservice.model.entity.BusinessHours;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.model.dto.request.BusinessHoursRequest;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class BusinessHourMapper {

    public static BusinessHoursResponse mapToDto(BusinessHours businessHours) {
        return BusinessHoursResponse.builder()
                .id(businessHours.getId())
                .openingTime(businessHours.getOpeningTime())
                .closingTime(businessHours.getClosingTime())
                .dayOfWeek(businessHours.getDayOfWeek())
                .active(businessHours.getActive())
                .build();
    }

    public static BusinessHours mapToModel(BusinessHoursRequest businessHours) {
        return BusinessHours.builder()
                .openingTime(businessHours.getOpeningTime())
                .closingTime(businessHours.getClosingTime())
                .dayOfWeek(businessHours.getDayOfWeek())
                .active(false)
                .build();
    }

    public static BusinessHours mapToModel(Restaurant restaurant, BusinessHoursUpdateRequest businessHours) {
        return BusinessHours.builder()
                .openingTime(businessHours.getOpeningTime())
                .closingTime(businessHours.getClosingTime())
                .dayOfWeek(businessHours.getDayOfWeek())
                .restaurant(restaurant)
                .active(businessHours.getActive())
                .build();
    }
}
