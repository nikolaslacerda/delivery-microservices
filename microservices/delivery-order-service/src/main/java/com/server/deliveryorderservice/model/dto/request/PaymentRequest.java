package com.server.deliveryorderservice.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {

    @NotNull
    private Long paymentMethodId;

    @NotEmpty
    private String name;

    @NotEmpty
    private String cardNumber;

    @NotEmpty
    private String expiration;

    @NotNull
    private Integer cvv;

    @NotNull
    private Double totalValue;

    @NotNull
    private UUID orderId;

}
