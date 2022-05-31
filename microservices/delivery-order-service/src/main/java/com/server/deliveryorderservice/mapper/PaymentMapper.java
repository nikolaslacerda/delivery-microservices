package com.server.deliveryorderservice.mapper;

import com.server.deliveryorderservice.model.dto.PaymentDto;
import com.server.deliveryorderservice.model.dto.RestaurantDto;
import com.server.deliveryorderservice.model.dto.request.PaymentRequest;
import com.server.deliveryorderservice.model.entity.Order;
import com.server.deliveryorderservice.model.entity.Restaurant;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PaymentMapper {

    public static PaymentRequest mapToRequest(Order order, PaymentDto paymentDto) {
        return PaymentRequest.builder()
                .paymentMethodId(paymentDto.getPaymentMethodId())
                .name(paymentDto.getName())
                .cardNumber(paymentDto.getCardNumber())
                .expiration(paymentDto.getExpiration())
                .cvv(paymentDto.getCvv())
                .totalValue(order.getTotalValueWithDiscount())
                .orderId(order.getId())
                .build();
    }
}
