package com.server.deliveryorderservice.exception;

import java.util.UUID;

public class OrderNotFoundException extends RuntimeException {

    public OrderNotFoundException(UUID orderUUID) {
        super(String.format("Order with id %s not exists!", orderUUID));
    }

}