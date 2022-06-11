package com.server.deliveryrestaurantservice.exception;

import javax.persistence.EntityNotFoundException;

public class BusinessHourNotFoundException extends EntityNotFoundException {

    public BusinessHourNotFoundException(Long businessHourId) {
        super(String.format("Business hour with id %s not exists!", businessHourId));
    }
}
