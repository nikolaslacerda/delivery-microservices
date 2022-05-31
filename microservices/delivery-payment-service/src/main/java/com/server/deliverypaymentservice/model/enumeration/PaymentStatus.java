package com.server.deliverypaymentservice.model.enumeration;

public enum PaymentStatus {

    CREATED(1, "Created"),
    CONFIRMED(2, "Confirmed"),
    CANCELED(3, "Canceled");

    private final Integer id;
    private final String value;

    PaymentStatus(Integer id, String value) {
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
