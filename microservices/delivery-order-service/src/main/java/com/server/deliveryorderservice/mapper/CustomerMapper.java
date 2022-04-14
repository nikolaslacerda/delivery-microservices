package com.server.deliveryorderservice.mapper;

import com.server.deliveryorderservice.model.dto.CustomerDto;
import com.server.deliveryorderservice.model.entity.Customer;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CustomerMapper {

    public static Customer mapToModel(CustomerDto customer) {
        return Customer.builder()
                .id(customer.getId())
                .cpf(customer.getCpf())
                .name(customer.getName())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .build();
    }
}
