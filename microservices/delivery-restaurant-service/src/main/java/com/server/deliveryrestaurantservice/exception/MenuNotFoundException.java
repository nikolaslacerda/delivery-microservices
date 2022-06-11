package com.server.deliveryrestaurantservice.exception;

import javax.persistence.EntityNotFoundException;

public class MenuNotFoundException extends EntityNotFoundException {

    public MenuNotFoundException(Long restaurantId) {
        super(String.format("Restaurant %s menu not exists!", restaurantId));
    }
}
