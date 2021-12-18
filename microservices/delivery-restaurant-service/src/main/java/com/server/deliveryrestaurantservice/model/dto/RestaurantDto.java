package com.server.deliveryrestaurantservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDto {

    private Long id;
    private String cnpj;
    private String name;
    private String description;
    private String cep;
    private String address;
    private BigDecimal deliveryPrice;
    private Integer minDeliveryTime;
    private Integer maxDeliveryTime;
    private Boolean approved;
    private Long cuisineTypeId;

}
