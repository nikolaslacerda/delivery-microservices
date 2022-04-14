package com.server.deliveryorderservice.mapper;

import com.server.deliveryorderservice.model.dto.AddressDto;
import com.server.deliveryorderservice.model.entity.Address;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AddressMapper {

    public static Address mapToModel(AddressDto addressDto) {
        return Address.builder()
                .streetName(addressDto.getStreetName())
                .streetNumber(addressDto.getStreetNumber())
                .city(addressDto.getCity())
                .complement(addressDto.getComplement())
                .country(addressDto.getCountry())
                .neighborhood(addressDto.getNeighborhood())
                .reference(addressDto.getReference())
                .state(addressDto.getState())
                .build();
    }

}
