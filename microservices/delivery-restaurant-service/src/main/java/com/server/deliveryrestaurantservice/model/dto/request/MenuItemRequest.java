package com.server.deliveryrestaurantservice.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItemRequest {

    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private BigDecimal promotionalPrice;

}


