package com.server.deliveryrestaurantservice.exception;

import javax.persistence.EntityNotFoundException;
import java.util.UUID;

public class PartnerRestaurantNotFoundException extends EntityNotFoundException {

    public PartnerRestaurantNotFoundException(UUID userUUID) {
        super(String.format("Partner %s restaurant not exists!", userUUID));
    }
}
