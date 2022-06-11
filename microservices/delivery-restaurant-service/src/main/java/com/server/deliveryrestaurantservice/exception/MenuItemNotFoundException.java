package com.server.deliveryrestaurantservice.exception;

import javax.persistence.EntityNotFoundException;

public class MenuItemNotFoundException extends EntityNotFoundException {

    public MenuItemNotFoundException(Long menuItemId) {
        super(String.format("Menu item with id %s not exists!", menuItemId));
    }
}
