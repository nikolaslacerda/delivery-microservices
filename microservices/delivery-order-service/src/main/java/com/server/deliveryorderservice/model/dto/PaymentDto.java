package com.server.deliveryorderservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {

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

}
