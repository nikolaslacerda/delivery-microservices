package com.server.deliveryuserservice.enumeration;

public enum RoleEnum {
    ADMIN,
    PARTNER,
    CUSTOMER;

    public String asAuthority() {
        return "ROLE_" + name();
    }
}
