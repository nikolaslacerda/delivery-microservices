package com.server.deliveryorderservice.exception;

public class OrderStatusUpdateException extends RuntimeException {

    public OrderStatusUpdateException(String lastStatus, String newStatus) {
        super(String.format("Cannot change status from %s to %s", lastStatus, newStatus));
    }

}