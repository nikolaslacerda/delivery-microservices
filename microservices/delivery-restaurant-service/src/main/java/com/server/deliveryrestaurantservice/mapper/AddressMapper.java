package com.server.deliveryrestaurantservice.mapper;

import com.server.deliveryrestaurantservice.model.dto.response.AddressResponse;
import com.server.deliveryrestaurantservice.model.entity.Address;
import com.server.deliveryrestaurantservice.model.dto.request.AddressRequest;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AddressMapper {

    public static Address mapToModel(AddressRequest addressRequest) {
        return Address.builder()
                .streetName(addressRequest.getStreetName())
                .streetNumber(addressRequest.getStreetNumber())
                .neighborhood(addressRequest.getNeighborhood())
                .city(addressRequest.getCity())
                .state(addressRequest.getState())
                .postalCode(addressRequest.getPostalCode())
                .country(addressRequest.getCountry())
                .complement(addressRequest.getComplement())
                .reference(addressRequest.getReference())
                .build();
    }

    public static AddressResponse mapToDto(Address address) {
        return AddressResponse.builder()
                .streetName(address.getStreetName())
                .streetNumber(address.getStreetNumber())
                .neighborhood(address.getNeighborhood())
                .city(address.getCity())
                .state(address.getState())
                .postalCode(address.getPostalCode())
                .country(address.getCountry())
                .complement(address.getComplement())
                .reference(address.getReference())
                .build();
    }
}
