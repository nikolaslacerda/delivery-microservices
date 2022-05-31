package com.server.deliverypaymentservice.model.dto.response;

import com.server.deliverypaymentservice.model.enumeration.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {

    private UUID id;
    private BigDecimal value;
    private String name;
    private String cardNumber;
    private String expiration;
    private Integer cvv;
    private PaymentStatus status;
    private Long paymentMethodId;
    private UUID orderId;

}
