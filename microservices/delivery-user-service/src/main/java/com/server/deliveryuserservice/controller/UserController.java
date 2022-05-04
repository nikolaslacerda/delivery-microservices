package com.server.deliveryuserservice.controller;

import com.server.deliveryuserservice.model.dto.UserRequest;
import com.server.deliveryuserservice.model.dto.UserResponse;
import com.server.deliveryuserservice.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
class UserController {

    private final UserService userService;

    @PostMapping("/user")
    public UserResponse createUser(@RequestBody UserRequest userRequest) {
        return userService.createUser(userRequest);
    }

    @PostMapping("/partner")
    public UserResponse createPartner(@RequestBody UserRequest partnerRequest) {
        return userService.createPartner(partnerRequest);
    }

    @GetMapping("/user/{userId}")
    public UserResponse getUserById(@PathVariable UUID userId) {
        return userService.getUser(userId);
    }

    @GetMapping("/user/email/{userEmail}")
    public UserResponse getUserByEmail(@PathVariable String userEmail) {
        return userService.getUserByEmail(userEmail);
    }

    @GetMapping("/user")
    public List<UserResponse> listUsers() {
        return userService.listUsers();
    }

}
