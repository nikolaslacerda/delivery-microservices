package com.server.deliveryorderservice.model.enumerations;

public enum Status {

    RECEIVED(1, "RECEIVED"),
    PAID(2, "PAID"),
    IN_THE_KITCHEN(3, "IN_THE_KITCHEN"),
    ON_THE_WAY(4, "ON_THE_WAY"),
    DELIVERED(5, "DELIVERED"),
    CANCELED(6, "CANCELED");

    private final Integer id;
    private final String value;

    Status(Integer id, String value) {
        this.id = id;
        this.value = value;
    }

    public Integer getId() {
        return id;
    }

    public String getValue() {
        return value;
    }
}
