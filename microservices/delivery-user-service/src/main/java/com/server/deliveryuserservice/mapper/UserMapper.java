package com.server.deliveryuserservice.mapper;

import com.server.deliveryuserservice.model.dto.UserRequest;
import com.server.deliveryuserservice.model.dto.UserResponse;
import com.server.deliveryuserservice.model.entity.User;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserMapper {

    public static UserResponse mapToDto(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .roles(user.getRoles().stream().map(RoleMapper::mapToDto).collect(Collectors.toList()))
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .cpf(user.getCpf())
                .build();
    }

    public static User mapToModel(UserRequest user) {
        return User.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .cpf(user.getCpf())
                .build();
    }
}
