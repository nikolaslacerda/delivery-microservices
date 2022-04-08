package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.model.dto.request.BusinessHoursRequest;
import com.server.deliveryrestaurantservice.model.dto.response.BusinessHoursResponse;
import com.server.deliveryrestaurantservice.service.BusinessHoursService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class BusinessHoursController {

    private final BusinessHoursService businessHoursService;

    @PostMapping("/partners/restaurants/{restaurantId}/business-hours")
    public BusinessHoursResponse createRestaurantBusinessHours(@PathVariable("restaurantId") Long restaurantId,
                                                               @RequestBody BusinessHoursRequest request) {
        return businessHoursService.createRestaurantBusinessHours(restaurantId, request);
    }

    @GetMapping("/partners/restaurants/{restaurantId}/business-hours")
    public List<BusinessHoursResponse> getRestaurantBusinessHours(@PathVariable("restaurantId") Long restaurantId) {
        return businessHoursService.getRestaurantBusinessHours(restaurantId);
    }

    @PutMapping("/partners/restaurants/{restaurantId}/business-hours/{businessHoursId}")
    public BusinessHoursResponse updateBusinessHours(@PathVariable("businessHoursId") Long businessHoursId,
                                                     @RequestBody BusinessHoursRequest request) {
        return businessHoursService.updateBusinessHours(businessHoursId, request);
    }

    @DeleteMapping("/partners/restaurants/{restaurantId}/business-hours/{businessHoursId}")
    public void deleteBusinessHours(@PathVariable("businessHoursId") Long businessHoursId) {
        businessHoursService.deleteBusinessHours(businessHoursId);
    }

}
