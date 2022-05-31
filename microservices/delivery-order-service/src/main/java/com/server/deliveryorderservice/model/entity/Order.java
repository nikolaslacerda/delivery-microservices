package com.server.deliveryorderservice.model.entity;

import com.server.deliveryorderservice.model.enumerations.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "order")
public class Order {

    @Id
    private UUID id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime closedAt;
    private Status lastStatus;
    private Boolean reviewed;
    private UUID customerId;
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
