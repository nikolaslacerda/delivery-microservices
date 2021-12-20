package com.server.deliveryorderservice.mapper;

import com.server.deliveryorderservice.model.dto.DeliveryDto;
import com.server.deliveryorderservice.model.entity.Delivery;

public class DeliveryMapper {

    public static DeliveryDto mapToDto(Delivery delivery) {
        return DeliveryDto.builder()
                .id(delivery.getId())
                .client(ClientMapper.mapToDto(delivery.getClient()))
                .cep(delivery.getCep())
                .address(delivery.getAddress())
                .complement(delivery.getComplement())
                .build();
    }

}
