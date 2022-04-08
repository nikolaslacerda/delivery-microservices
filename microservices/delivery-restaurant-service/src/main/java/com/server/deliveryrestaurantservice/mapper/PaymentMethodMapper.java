package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.response.PaymentMethodResponse;
import com.server.deliveryrestaurantservice.model.entity.PaymentMethod;
import com.server.deliveryrestaurantservice.model.entity.RestaurantPaymentMethod;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PaymentMethodMapper {

    public static PaymentMethodResponse mapToDto(PaymentMethod paymentMethod) {
        return PaymentMethodResponse.builder()
                .id(paymentMethod.getId())
                .name(paymentMethod.getName())
                .build();
    }

    public static PaymentMethodResponse mapRestaurantPaymentToDto(RestaurantPaymentMethod paymentMethod) {
        return PaymentMethodResponse.builder()
                .id(paymentMethod.getPaymentMethod().getId())
                .name(paymentMethod.getPaymentMethod().getName())
                .build();
    }
}
