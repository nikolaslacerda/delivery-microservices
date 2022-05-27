package com.server.deliverypaymentservice.model.dto.request;

import com.server.deliverypaymentservice.model.enumeration.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {

    @NotEmpty
    private String name;

    @NotNull
    @Positive
    private BigDecimal totalValue;

    @NotEmpty
    private String number;

    @NotEmpty
    private String expiration;

    @NotEmpty
    private String code;

    @NotNull
    private Long paymentMethodId;

    @NotNull
    private UUID orderId;

}
