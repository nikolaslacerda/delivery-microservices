package com.server.deliveryrestaurantservice.model.dto;

import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantDistanceDto {

    private Long id;
    private String cep;
    private Long cuisineTypeId;

}
