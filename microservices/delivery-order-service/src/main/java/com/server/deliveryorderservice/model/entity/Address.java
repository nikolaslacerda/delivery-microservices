package com.server.deliveryorderservice.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    private String streetName;
    private String streetNumber;
    private String neighborhood;
    private String city;
    private String state;
    private String country;
    private String complement;
    private String reference;

}
