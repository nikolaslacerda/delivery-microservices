package com.server.deliveryadminservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.server.deliveryadminservice.model.PaymentMethod.Type;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentMethodDto {

    private Long id;
    private Type type;
    private String name;

    public PaymentMethodDto(PaymentMethod paymentMethod) {
        this(paymentMethod.getId(), paymentMethod.getType(), paymentMethod.getName());
    }

}
