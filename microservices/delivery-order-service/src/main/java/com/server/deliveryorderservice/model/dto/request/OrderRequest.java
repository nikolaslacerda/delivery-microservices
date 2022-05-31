package com.server.deliveryorderservice.model.dto.request;

import com.server.deliveryorderservice.model.dto.DeliveryDto;
import com.server.deliveryorderservice.model.dto.OrderItemDto;
import com.server.deliveryorderservice.model.dto.PaymentDto;
import com.server.deliveryorderservice.model.dto.RestaurantDto;
import com.server.deliveryorderservice.validation.CorrectOrderPrices;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Data
@CorrectOrderPrices
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    @NotNull
    private UUID customerId;

    @Valid
    @NotNull
    private DeliveryDto delivery;

    @Valid
    @NotNull
    private RestaurantDto restaurant;

    @Valid
    @NotNull
    private PaymentDto payment;

    @Valid
    @NotNull
    private List<OrderItemDto> items;

    @NotNull
    private Double subtotal;

    @NotNull
    private Double subtotalWithDiscount;

    @NotNull
    private Double totalValue;

    @NotNull
    private Double totalValueWithDiscount;

    @NotNull
    private Double deliveryFee;
}
