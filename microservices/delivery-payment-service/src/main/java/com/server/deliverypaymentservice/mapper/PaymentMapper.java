package com.server.deliverypaymentservice.mapper;

import com.server.deliverypaymentservice.model.entity.Payment;
import com.server.deliverypaymentservice.model.dto.request.PaymentRequest;
import com.server.deliverypaymentservice.model.dto.response.PaymentResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PaymentMapper {

    public static Payment mapToModel(PaymentRequest paymentRequest) {
        return Payment.builder()
                .totalValue(paymentRequest.getTotalValue())
                .name(paymentRequest.getName())
                .cardNumber(paymentRequest.getCardNumber())
                .expiration(paymentRequest.getExpiration())
                .cvv(paymentRequest.getCvv())
                .paymentMethodId(paymentRequest.getPaymentMethodId())
                .orderId(paymentRequest.getOrderId())
                .build();
    }

    public static PaymentResponse mapToResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .value(payment.getTotalValue())
                .name(payment.getName())
                .cardNumber(payment.getCardNumber())
                .expiration(payment.getExpiration())
                .cvv(payment.getCvv())
                .status(payment.getStatus())
                .paymentMethodId(payment.getPaymentMethodId())
                .orderId(payment.getOrderId())
                .build();
    }
}
