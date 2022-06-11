package com.server.deliverypaymentservice.exception;

import java.util.UUID;

public class PaymentNotFoundException extends RuntimeException {

    public PaymentNotFoundException(UUID paymentId) {
        super(String.format("Payment with id %s not exists!", paymentId));
    }

}