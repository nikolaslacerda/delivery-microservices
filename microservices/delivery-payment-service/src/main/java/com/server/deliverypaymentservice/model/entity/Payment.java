package com.server.deliverypaymentservice.model.entity;

import com.server.deliverypaymentservice.model.enumeration.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    private UUID id;

    private BigDecimal totalValue;

    private String name;

    private String number;

    private String expiration;

    private String code;

    private PaymentStatus status;

    private UUID orderId;

    private Long paymentMethodId;

}
