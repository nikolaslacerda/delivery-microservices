package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.model.dto.request.BusinessHoursRequest;
import com.server.deliveryrestaurantservice.model.dto.request.BusinessHoursUpdateRequest;
import com.server.deliveryrestaurantservice.model.dto.response.BusinessHoursResponse;
import com.server.deliveryrestaurantservice.service.BusinessHoursService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public List<BusinessHoursResponse> getAllRestaurantBusinessHours(@PathVariable("restaurantId") Long restaurantId) {
        return businessHoursService.getAllRestaurantBusinessHours(restaurantId);
    }

    @GetMapping("/restaurants/{restaurantId}/business-hours")
    public List<BusinessHoursResponse> getRestaurantBusinessHours(@PathVariable("restaurantId") Long restaurantId) {
        return businessHoursService.getRestaurantBusinessHours(restaurantId);
    }

    @PutMapping("/partners/restaurants/{restaurantId}/business-hours/{businessHoursId}")
    public BusinessHoursResponse updateBusinessHours(@PathVariable Long restaurantId,
                                                     @PathVariable Long businessHoursId,
                                                     @RequestBody BusinessHoursUpdateRequest request) {
        return businessHoursService.updateBusinessHours(restaurantId, businessHoursId, request);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/partners/restaurants/{restaurantId}/business-hours/{businessHoursId}")
    public void deleteBusinessHours(@PathVariable Long restaurantId, @PathVariable Long businessHoursId) {
        businessHoursService.deleteBusinessHours(restaurantId, businessHoursId);
    }

}
