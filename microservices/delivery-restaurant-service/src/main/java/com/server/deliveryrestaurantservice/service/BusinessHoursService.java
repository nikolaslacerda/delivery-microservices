package com.server.deliveryrestaurantservice.service;

import com.server.deliveryrestaurantservice.exception.ResourceNotFoundException;
import com.server.deliveryrestaurantservice.mapper.BusinessHourMapper;
import com.server.deliveryrestaurantservice.model.dto.request.BusinessHoursRequest;
import com.server.deliveryrestaurantservice.model.dto.request.BusinessHoursUpdateRequest;
import com.server.deliveryrestaurantservice.model.dto.response.BusinessHoursResponse;
import com.server.deliveryrestaurantservice.model.entity.BusinessHours;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.repository.BusinessHoursRepository;
import com.server.deliveryrestaurantservice.repository.RestaurantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BusinessHoursService {

    private final RestaurantRepository restaurantRepository;
    private final BusinessHoursRepository businessHoursRepository;

    public BusinessHoursResponse createRestaurantBusinessHours(Long restaurantId, BusinessHoursRequest businessHours) {
        Restaurant foundRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(ResourceNotFoundException::new);
        verifyIfHoursIsAlreadyRegistered(foundRestaurant.getBusinessHours(), businessHours);
        BusinessHours businessHoursToSave = BusinessHourMapper.mapToModel(businessHours);
        businessHoursToSave.setRestaurant(foundRestaurant);
        return BusinessHourMapper.mapToDto(businessHoursRepository.save(businessHoursToSave));
    }

    public List<BusinessHoursResponse> getAllRestaurantBusinessHours(Long restaurantId) {
        Restaurant foundRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(ResourceNotFoundException::new);
        return foundRestaurant.getBusinessHours()
                .stream()
                .map(BusinessHourMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public List<BusinessHoursResponse> getRestaurantBusinessHours(Long restaurantId) {
        Restaurant foundRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(ResourceNotFoundException::new);
        return foundRestaurant.getBusinessHours()
                .stream()
                .filter(BusinessHours::getActive)
                .map(BusinessHourMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public BusinessHoursResponse updateBusinessHours(Long restaurantId, Long businessHoursId, BusinessHoursUpdateRequest businessHours) {
        Restaurant foundRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(ResourceNotFoundException::new);
        BusinessHours foundBusinessHours = businessHoursRepository.findById(businessHoursId)
                .orElseThrow(ResourceNotFoundException::new);
        verifyIfHoursIsAlreadyRegistered(foundRestaurant.getBusinessHours(), businessHours);
        BusinessHours businessHourToUpdate = BusinessHourMapper.mapToModel(foundBusinessHours.getRestaurant(), businessHours);
        businessHourToUpdate.setId(foundBusinessHours.getId());
        return BusinessHourMapper.mapToDto(businessHoursRepository.save(businessHourToUpdate));
    }

    @Transactional
    public void deleteBusinessHours(Long restaurantId, Long businessHoursId) {
        Restaurant foundRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(ResourceNotFoundException::new);
        businessHoursRepository.deleteByIdAndRestaurant(businessHoursId, foundRestaurant);
    }

    private void verifyIfHoursIsAlreadyRegistered(List<BusinessHours> restaurantBusinessHours, BusinessHoursRequest businessHours) {
        if (restaurantBusinessHours.stream().anyMatch(x -> isValid(x, businessHours)))
            throw new RuntimeException("Hour already exists");
    }

    private boolean isValid(BusinessHours rb, BusinessHoursRequest businessHours) {
        return !isHourEquals(rb, businessHours) || !isHourInInterval(rb, businessHours);
    }

    private boolean isHourEquals(BusinessHours rb, BusinessHoursRequest businessHours) {
        return rb.getDayOfWeek().equals(businessHours.getDayOfWeek()) &&
                rb.getOpeningTime().equals(businessHours.getOpeningTime()) &&
                rb.getClosingTime().equals(businessHours.getClosingTime());
    }

    private boolean isHourInInterval(BusinessHours rb, BusinessHoursRequest businessHours) {
        return (rb.getDayOfWeek().equals(businessHours.getDayOfWeek())) &&
                (businessHours.getOpeningTime().isAfter(rb.getOpeningTime()) || rb.getOpeningTime().equals(businessHours.getOpeningTime())) &&
                (businessHours.getClosingTime().isBefore(rb.getClosingTime()) || rb.getClosingTime().equals(businessHours.getClosingTime()));
    }
}
