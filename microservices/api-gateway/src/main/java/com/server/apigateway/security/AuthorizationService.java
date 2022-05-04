package com.server.apigateway.security;

import com.server.apigateway.integration.RestaurantRestClient;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthorizationService {

    private final RestaurantRestClient restaurantRestClient;

    public boolean validateRestaurantId(Authentication authentication, long restaurantId) {
        if (authentication.getAuthorities().contains(new SimpleGrantedAuthority(Role.ROLES.PARTNER.asAuthority()))) {
            Map<String, Object> restaurantData = restaurantRestClient.getRestaurantByUsername(UUID.fromString(authentication.getPrincipal().toString()));
            if (restaurantData != null) {
                return restaurantId == Long.parseLong(restaurantData.get("id").toString());
            }
        }
        return false;
    }
}

