package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.model.dto.response.CuisineTypeResponse;
import com.server.deliveryrestaurantservice.service.CuisineTypeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class CuisineTypeController {

    private final CuisineTypeService cuisineTypeService;

    @GetMapping("/cuisine-types")
    public List<CuisineTypeResponse> getCuisineTypes() {
        return cuisineTypeService.getCuisineTypes();
    }

}
