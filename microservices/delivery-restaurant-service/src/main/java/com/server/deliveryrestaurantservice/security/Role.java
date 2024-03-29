//package com.server.deliveryrestaurantservice.security;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.springframework.security.core.GrantedAuthority;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class Role implements GrantedAuthority {
//
//    private static final long serialVersionUID = 1L;
//
//    public enum ROLES {
//        ADMIN, PARTNER;
//
//        public String asAuthority() {
//            return "ROLE_" + name();
//        }
//    }
//
//    private String authority;
//
//    public String getRole() {
//        return authority.replace("ROLE_", "");
//    }
//}
