package com.server.deliveryrestaurantservice.exception;

import javax.persistence.EntityNotFoundException;

public class PaymentMethodNotFoundException extends EntityNotFoundException {

    public PaymentMethodNotFoundException(Long paymentMethodId) {
        super(String.format("Payment Method with id %s not exists!", paymentMethodId));
    }
}
