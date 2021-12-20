package com.server.deliveryorderservice.mapper;

import com.server.deliveryorderservice.model.entity.Client;
import com.server.deliveryorderservice.model.dto.ClientDto;

public class ClientMapper {

    public static ClientDto mapToDto(Client client) {
        return ClientDto.builder()
                .cpf(client.getCpf())
                .name(client.getName())
                .email(client.getEmail())
                .phone(client.getPhone())
                .build();
    }

}
