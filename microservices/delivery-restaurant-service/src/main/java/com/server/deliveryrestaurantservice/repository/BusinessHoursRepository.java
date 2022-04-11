package com.server.deliveryrestaurantservice.repository;

import java.util.List;

import com.server.deliveryrestaurantservice.model.entity.BusinessHours;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessHoursRepository extends JpaRepository<BusinessHours, Long> {

	List<BusinessHours> findAllByRestaurant(Restaurant restaurant);

    void deleteByIdAndRestaurant(Long id, Restaurant restaurant);
}
