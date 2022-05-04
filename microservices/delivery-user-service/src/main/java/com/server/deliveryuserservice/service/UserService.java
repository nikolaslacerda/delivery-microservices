package com.server.deliveryuserservice.service;

import com.server.deliveryuserservice.enumeration.RoleEnum;
import com.server.deliveryuserservice.mapper.UserMapper;
import com.server.deliveryuserservice.model.dto.UserRequest;
import com.server.deliveryuserservice.model.dto.UserResponse;
import com.server.deliveryuserservice.model.entity.User;
import com.server.deliveryuserservice.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {

    private final PasswordEncoder encoder;
    private final UserRepository userRepository;

    public UserResponse createUser(UserRequest user) {
        User userToCreate = UserMapper.mapToModel(user);
        userToCreate.addRole(RoleEnum.CUSTOMER);
        userToCreate.setPassword(encoder.encode(user.getPassword()));
        User createdUser = userRepository.save(userToCreate);
        return UserMapper.mapToDto(createdUser);
    }

    public UserResponse createPartner(UserRequest partnerRequest) {
        if (userRepository.findByEmail(partnerRequest.getEmail()).isPresent()) {
            User userFound = userRepository.findByEmail(partnerRequest.getEmail())
                    .orElseThrow(EntityNotFoundException::new);
            userFound.addRole(RoleEnum.PARTNER);
            User createdUser = userRepository.save(userFound);
            return UserMapper.mapToDto(createdUser);
        } else {
            User userToCreate = UserMapper.mapToModel(partnerRequest);
            userToCreate.addRole(RoleEnum.PARTNER);
            userToCreate.setPassword(encoder.encode(partnerRequest.getPassword()));
            User createdUser = userRepository.save(userToCreate);
            return UserMapper.mapToDto(createdUser);
        }
    }

    public UserResponse getUser(UUID id) {
        return userRepository.findById(id)
                .map(UserMapper::mapToDto)
                .orElseThrow(EntityNotFoundException::new);
    }

    public UserResponse getUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail)
                .map(UserMapper::mapToDto)
                .orElseThrow(EntityNotFoundException::new);
    }

    public List<UserResponse> listUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::mapToDto)
                .collect(Collectors.toList());
    }
}
