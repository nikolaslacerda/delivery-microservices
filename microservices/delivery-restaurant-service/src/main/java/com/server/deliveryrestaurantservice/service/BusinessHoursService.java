package com.server.deliveryrestaurantservice.service;

import com.server.deliveryrestaurantservice.exception.HourAlreadyRegisteredException;
import com.server.deliveryrestaurantservice.mapper.BusinessHourMapper;
import com.server.deliveryrestaurantservice.model.dto.request.BusinessHoursRequest;
import com.server.deliveryrestaurantservice.model.dto.response.BusinessHoursResponse;
import com.server.deliveryrestaurantservice.model.entity.BusinessHours;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.repository.BusinessHoursRepository;
import com.server.deliveryrestaurantservice.repository.RestaurantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
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
                .orElseThrow(EntityNotFoundException::new);
        verifyIfHoursIsAlreadyRegistered(foundRestaurant.getBusinessHours(), businessHours);
        BusinessHours businessHoursToSave = BusinessHourMapper.mapToModel(businessHours);
        businessHoursToSave.setRestaurant(foundRestaurant);
        return BusinessHourMapper.mapToDto(businessHoursRepository.save(businessHoursToSave));
    }

    public List<BusinessHoursResponse> getAllRestaurantBusinessHours(Long restaurantId) {
        Restaurant foundRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(EntityNotFoundException::new);
        return foundRestaurant.getBusinessHours()
                .stream()
                .map(BusinessHourMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public List<BusinessHoursResponse> getRestaurantBusinessHours(Long restaurantId) {
        Restaurant foundRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(EntityNotFoundException::new);
        return foundRestaurant.getBusinessHours()
                .stream()
                .filter(BusinessHours::getActive) // query?
                .map(BusinessHourMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public BusinessHoursResponse updateBusinessHours(Long restaurantId, Long businessHoursId, BusinessHoursRequest businessHours) {
        Restaurant foundRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(EntityNotFoundException::new);
        BusinessHours foundBusinessHours = businessHoursRepository.findById(businessHoursId)
                .orElseThrow(EntityNotFoundException::new);
        verifyIfHoursIsAlreadyRegistered(foundRestaurant.getBusinessHours().stream().filter(x -> !x.getId().equals(businessHoursId)).collect(Collectors.toList()), businessHours);
        foundBusinessHours.setDayOfWeek(businessHours.getDayOfWeek());
        foundBusinessHours.setOpeningTime(businessHours.getOpeningTime());
        foundBusinessHours.setClosingTime(businessHours.getClosingTime());
        foundBusinessHours.setActive(businessHours.getActive());
        return BusinessHourMapper.mapToDto(businessHoursRepository.save(foundBusinessHours));
    }

    @Transactional
    public void deleteBusinessHours(Long restaurantId, Long businessHoursId) {
        Restaurant foundRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(EntityNotFoundException::new);
        businessHoursRepository.deleteByIdAndRestaurant(businessHoursId, foundRestaurant);
    }

    private void verifyIfHoursIsAlreadyRegistered(List<BusinessHours> restaurantBusinessHours, BusinessHoursRequest businessHours) {
        if (restaurantBusinessHours.stream().anyMatch(x -> !isValid(x, businessHours)))
            throw new HourAlreadyRegisteredException();
    }


    private boolean isValid(BusinessHours rb, BusinessHoursRequest businessHours) {
        return !isHourEquals(rb, businessHours) && !isHourInInterval(rb, businessHours);
    }

    private boolean isHourEquals(BusinessHours rb, BusinessHoursRequest businessHours) {
        return rb.getDayOfWeek().equals(businessHours.getDayOfWeek()) &&
                rb.getOpeningTime().equals(businessHours.getOpeningTime()) &&
                rb.getClosingTime().equals(businessHours.getClosingTime());
    }

    private boolean isHourInInterval(BusinessHours rb, BusinessHoursRequest businessHours) {
        return rb.getDayOfWeek().equals(businessHours.getDayOfWeek()) &&
                !isHourAfter(rb, businessHours) &&
                !isHourBefore(rb, businessHours);

    }

    private boolean isHourBefore(BusinessHours rb, BusinessHoursRequest businessHours) {
        return rb.getClosingTime().isBefore(businessHours.getOpeningTime()) &&
                rb.getClosingTime().isBefore(businessHours.getClosingTime());
    }

    private boolean isHourAfter(BusinessHours rb, BusinessHoursRequest businessHours) {
        return rb.getOpeningTime().isAfter(businessHours.getOpeningTime()) &&
                rb.getOpeningTime().isAfter(businessHours.getClosingTime());
    }
}
