package com.server.deliveryrestaurantservice.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
class JwtTokenManager {

    private String secret;

    public JwtTokenManager(@Value("${jwt.secret}") String secret) {
        this.secret = secret;
    }

    public boolean isValid(String jwt) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(jwt);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    @SuppressWarnings("unchecked")
    public User getUserFromToken(String jwt) {
        Claims claims = Jwts.parser().setSigningKey(this.secret).parseClaimsJws(jwt).getBody();
        User user = new User();
        user.setName(claims.get("username", String.class));
        user.setId(Long.parseLong(claims.getSubject()));
        List<String> roles = claims.get("roles", List.class);
        roles.stream().forEach(role -> user.addRole(Role.ROLES.valueOf(role)));
        return user;
    }

}
