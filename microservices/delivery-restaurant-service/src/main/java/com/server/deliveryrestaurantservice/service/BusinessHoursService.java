package com.server.deliveryrestaurantservice.service;

import com.server.deliveryrestaurantservice.exception.ResourceNotFoundException;
import com.server.deliveryrestaurantservice.mapper.BusinessHourMapper;
import com.server.deliveryrestaurantservice.model.dto.response.BusinessHoursResponse;
import com.server.deliveryrestaurantservice.model.entity.BusinessHours;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.model.dto.request.BusinessHoursRequest;
import com.server.deliveryrestaurantservice.repository.BusinessHoursRepository;
import com.server.deliveryrestaurantservice.repository.RestaurantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BusinessHoursService {

    private final RestaurantRepository restaurantRepository;
    private final BusinessHoursRepository businessHoursRepository;

    public BusinessHoursResponse createRestaurantBusinessHours(Long restaurantId, BusinessHoursRequest businessHours) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(ResourceNotFoundException::new);
        BusinessHours businessHours1 = BusinessHourMapper.mapToModel(restaurant, businessHours);
        return BusinessHourMapper.mapToDto(businessHoursRepository.save(businessHours1));
    }

    public List<BusinessHoursResponse> getRestaurantBusinessHours(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(ResourceNotFoundException::new);
        List<BusinessHours> businessHours = businessHoursRepository.findAllByRestaurant(restaurant);
        return businessHours.stream()
                .map(BusinessHourMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public BusinessHoursResponse updateBusinessHours(Long businessHoursId, BusinessHoursRequest businessHours) {
        BusinessHours businessHours1 = businessHoursRepository.findById(businessHoursId)
                .orElseThrow(ResourceNotFoundException::new);
        BusinessHours bookToUpdate = BusinessHourMapper.mapToModel(businessHours1.getRestaurant(), businessHours); //active
        bookToUpdate.setId(businessHours1.getId());
        return BusinessHourMapper.mapToDto(businessHoursRepository.save(bookToUpdate));
    }

    public void deleteBusinessHours(Long businessHoursId) {
        businessHoursRepository.deleteById(businessHoursId);
    }
}
