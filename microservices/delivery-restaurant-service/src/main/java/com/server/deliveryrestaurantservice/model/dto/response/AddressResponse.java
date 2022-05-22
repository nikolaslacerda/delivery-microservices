package com.server.deliveryrestaurantservice.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressResponse {

    private String streetName;
    private Integer streetNumber;
    private String neighborhood;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private String complement;
    private String reference;

}
