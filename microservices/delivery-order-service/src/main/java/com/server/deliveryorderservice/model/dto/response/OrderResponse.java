package com.server.deliveryorderservice.model.dto.response;

import com.server.deliveryorderservice.model.entity.Delivery;
import com.server.deliveryorderservice.model.entity.OrderItem;
import com.server.deliveryorderservice.model.entity.Restaurant;
import com.server.deliveryorderservice.model.enumerations.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

    private UUID id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime closedAt;
    private Status lastStatus;
    private Boolean reviewed;
    private UUID paymentId;
    private Delivery delivery;
    private Restaurant restaurant;
    private List<OrderItem> items;
    private Double subtotal;
    private Double subtotalWithDiscount;
    private Double totalValue;
    private Double totalValueWithDiscount;
    private Double deliveryFee;
}
