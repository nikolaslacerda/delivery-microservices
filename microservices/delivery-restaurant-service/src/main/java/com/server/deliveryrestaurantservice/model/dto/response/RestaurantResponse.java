package com.server.deliveryrestaurantservice.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantResponse {

    private Long id;
    private String cnpj;
    private String name;
    private String description;
    private String imageUrl;
    private Double userRating;
    private BigDecimal deliveryFee;
    private Integer minDeliveryTime;
    private Integer maxDeliveryTime;
    private Boolean active;
    private String cuisineType;
    private AddressResponse address;

}
