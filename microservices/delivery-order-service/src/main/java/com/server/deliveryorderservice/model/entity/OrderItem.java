package com.server.deliveryorderservice.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    private UUID id;
    private String name;
    private String description;
    private String notes;
    private Integer quantity;
    private Double price;
    private Double promotionalPrice;
    private Double totalPrice;
    private Double totalPriceWithDiscount;

}
