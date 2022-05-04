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
                .name(user.getName())
                .roles(user.getRoles().stream().map(RoleMapper::mapToDto).collect(Collectors.toList()))
                .email(user.getEmail())
                .build();
    }

    public static User mapToModel(UserRequest user) {
        return User.builder()
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }
}
