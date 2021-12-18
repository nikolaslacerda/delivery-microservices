package com.server.deliveryrestaurantservice.controller;

import java.util.List;
import java.util.stream.Collectors;

import com.server.deliveryrestaurantservice.exception.ResourceNotFoundException;
import com.server.deliveryrestaurantservice.mapper.BusinessHourMapper;
import com.server.deliveryrestaurantservice.model.entity.BusinessHours;
import com.server.deliveryrestaurantservice.model.dto.BusinessHoursDto;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.repository.BusinessHoursRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class BusinessHoursController {

	private BusinessHoursRepository businessHoursRepository;

	@PostMapping("/partners/restaurants/{idRestaurant}/business-hours")
	public BusinessHours createRestaurantBusinessHours(@RequestBody BusinessHours businessHours) {
		return businessHoursRepository.save(businessHours);
	}

	@GetMapping("/restaurants/{idRestaurant}/business-hours/{id}")
	public BusinessHoursDto getRestaurantBusinessHoursByDay(@PathVariable("id") Long id) {
		BusinessHours businessHours = businessHoursRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
		return BusinessHourMapper.mapToDto(businessHours);
	}

	@GetMapping("/restaurants/{idRestaurant}/business-hours")
	public List<BusinessHoursDto> getRestaurantBusinessHours(@PathVariable("idRestaurant") Long idRestaurant) {
		Restaurant restaurant = new Restaurant();
		restaurant.setId(idRestaurant);
		List<BusinessHours> businessHours = businessHoursRepository.findAllByRestaurant(restaurant);
		return businessHours.stream()
				.map(BusinessHourMapper::mapToDto)
				.collect(Collectors.toList());
	}

	@PutMapping("/partners/restaurants/{idRestaurant}/business-hours/{id}")
	public BusinessHours updateBusinessHours(@RequestBody BusinessHours businessHours) {
		return businessHoursRepository.save(businessHours);
	}

	@DeleteMapping("/partners/restaurants/{idRestaurant}/business-hours/{id}")
	public void deleteBusinessHours(@PathVariable("id") Long id) {
		businessHoursRepository.deleteById(id);
	}

}
