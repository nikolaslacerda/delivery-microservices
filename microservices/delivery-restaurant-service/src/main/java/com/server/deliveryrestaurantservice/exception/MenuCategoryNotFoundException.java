package com.server.deliveryrestaurantservice.exception;

import javax.persistence.EntityNotFoundException;

public class MenuCategoryNotFoundException extends EntityNotFoundException {

    public MenuCategoryNotFoundException(Long menuCategoryId) {
        super(String.format("Menu category with id %s not exists!", menuCategoryId));
    }
}
