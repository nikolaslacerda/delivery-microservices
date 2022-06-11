package com.server.deliveryrestaurantservice.exception;

import javax.persistence.EntityNotFoundException;

public class RestaurantNotFoundException extends EntityNotFoundException {

    public RestaurantNotFoundException(Long restaurantId) {
        super(String.format("Restaurant with id %s not exists!", restaurantId));
    }
}
