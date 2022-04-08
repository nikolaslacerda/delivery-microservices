package com.server.deliveryrestaurantservice.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantRequest {

    private String cnpj;
    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal deliveryPrice;
    private Integer minDeliveryTime;
    private Integer maxDeliveryTime;
    private Long cuisineTypeId;
    private AddressRequest address;
    private Long partnerId;

}
