package com.server.authorizationserver.controller;

import com.server.authorizationserver.model.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.common.exceptions.UnauthorizedClientException;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
public class AuthController {

    @GetMapping(value = "/oauth/me")
    public UserDto getUser(Principal principal) {
        if (principal != null) {
            OAuth2Authentication oAuth2Authentication = (OAuth2Authentication) principal;
            Authentication authentication = oAuth2Authentication.getUserAuthentication();
            return UserDto.builder()
                    .username(authentication.getName())
                    .role(authentication.getAuthorities()
                            .stream()
                            .findFirst()
                            .orElseThrow(EntityNotFoundException::new)
                            .getAuthority())
                    .build();
        }
        throw new UnauthorizedClientException("Full authentication is required to access this resource");
    }

}
