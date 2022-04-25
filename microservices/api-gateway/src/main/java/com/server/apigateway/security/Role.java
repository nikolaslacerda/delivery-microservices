package com.server.apigateway.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role implements GrantedAuthority {

    public enum ROLES {
        ADMIN, PARTNER, CUSTOMER;

        public String asAuthority() {
            return "ROLE_" + name();
        }
    }

    private String authority;
}

