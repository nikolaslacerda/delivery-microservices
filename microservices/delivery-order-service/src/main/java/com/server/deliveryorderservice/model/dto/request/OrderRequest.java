package com.server.deliveryorderservice.model.dto.request;

import com.server.deliveryorderservice.model.dto.CustomerDto;
import com.server.deliveryorderservice.model.dto.DeliveryDto;
import com.server.deliveryorderservice.model.dto.OrderItemDto;
import com.server.deliveryorderservice.model.dto.RestaurantDto;
import com.server.deliveryorderservice.validation.CorrectOrderPrices;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@CorrectOrderPrices
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    @Valid
    @NotNull
    private CustomerDto customer;

    @Valid
    @NotNull
    private DeliveryDto delivery;

    @Valid
    @NotNull
    private RestaurantDto restaurant;

    @Valid
    @NotNull
    private List<OrderItemDto> items;

    @NotNull
    private Double subTotal;

    @NotNull
    private Double subTotalWithDiscount;

    @NotNull
    private Double totalValue;

    @NotNull
    private Double totalValueWithDiscount;
}
