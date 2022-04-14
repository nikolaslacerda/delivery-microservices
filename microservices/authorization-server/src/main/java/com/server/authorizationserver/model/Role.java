package com.server.authorizationserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Role implements GrantedAuthority {

    private static final long serialVersionUID = 1L;

    public enum ROLES {
        ADMIN, PARTNER, CUSTOMER;

        public String asAuthority() {
            return "ROLE_" + name();
        }
    }

    @Id
    private String authority;

    public String getRole() {
        return authority.replace("ROLE_", "");
    }
}
