package com.server.deliveryrestaurantservice.exception;

public class NoCategoryItemsException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public NoCategoryItemsException() {
        super("Category cannot be activated without items");
    }

}