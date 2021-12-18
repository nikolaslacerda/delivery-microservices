package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.BusinessHoursDto;
import com.server.deliveryrestaurantservice.model.entity.BusinessHours;

public class BusinessHourMapper {

    public static BusinessHoursDto mapToDto(BusinessHours businessHours) {
        return BusinessHoursDto.builder()
                .id(businessHours.getId())
                .openingTime(businessHours.getOpeningTime())
                .closingTime(businessHours.getClosingTime())
                .dayOfWeek(businessHours.getDayOfWeek())
                .build();
    }
}
