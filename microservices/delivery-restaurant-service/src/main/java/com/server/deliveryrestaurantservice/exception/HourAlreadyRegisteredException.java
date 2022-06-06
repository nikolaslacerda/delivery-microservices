package com.server.deliveryrestaurantservice.exception;

public class HourAlreadyRegisteredException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public HourAlreadyRegisteredException() {
        super("Time already exists or is between an already existing time");
    }

}
