package com.server.deliverypaymentservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {

    private Long id;
    private BigDecimal value;
    private String name;
    private String number;
    private String expiration;
    private String code;
    private Payment.Status status;
    private Long paymentMethodId;
    private Long orderId;

    public PaymentDto(Payment p) {
        this(p.getId(), p.getTotalValue(), p.getName(), p.getNumber(), p.getExpiration(), p.getCode(), p.getStatus(), p.getPaymentMethodId(), p.getOrderId());
    }

}
