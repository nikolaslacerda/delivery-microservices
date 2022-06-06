package com.server.deliveryrestaurantservice.exception;

public class CategoryDisabledException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public CategoryDisabledException() {
        super("Item cannot be activated because its category is not activated");
    }

}