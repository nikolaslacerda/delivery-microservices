package com.server.deliverydistanceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantWithDistanceDto {

    private String restaurantId;

    private BigDecimal distance;

}
