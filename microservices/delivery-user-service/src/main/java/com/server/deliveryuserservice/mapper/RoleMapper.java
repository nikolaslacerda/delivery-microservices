package com.server.deliveryuserservice.mapper;

import com.server.deliveryuserservice.model.entity.Role;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RoleMapper {

    public static String mapToDto(Role role) {
        return role.getAuthority();
    }
}
