package com.server.deliveryorderservice.mapper;

import com.server.deliveryorderservice.model.dto.DeliveryDto;
import com.server.deliveryorderservice.model.entity.Delivery;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DeliveryMapper {

    public static Delivery mapToModel(DeliveryDto delivery) {
        return Delivery.builder()
                .address(AddressMapper.mapToModel(delivery.getAddress()))
                .build();
    }
}
