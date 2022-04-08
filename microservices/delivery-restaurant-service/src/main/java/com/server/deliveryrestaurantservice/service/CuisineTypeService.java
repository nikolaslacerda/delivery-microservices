package com.server.deliveryrestaurantservice.service;

import com.server.deliveryrestaurantservice.mapper.CuisineTypeMapper;
import com.server.deliveryrestaurantservice.model.dto.response.CuisineTypeResponse;
import com.server.deliveryrestaurantservice.repository.CuisineTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CuisineTypeService {

    private final CuisineTypeRepository cuisineTypeRepository;

    public List<CuisineTypeResponse> getCuisineTypes() {
        return cuisineTypeRepository.findAll()
                .stream()
                .map(CuisineTypeMapper::mapToDto)
                .collect(Collectors.toList());
    }
}
