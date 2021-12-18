package com.server.deliveryrestaurantservice.service;

import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.repository.RestaurantRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RestaurantService {

    private RestaurantRepository restaurantRepository;

    public Page<Restaurant> findAllByApproved(boolean approved, Pageable limit) {
        return restaurantRepository.findAllByApproved(approved, limit);
    }

    public Page<Restaurant> findAllByApprovedAndCuisineTypeId(boolean approved, Long type, Pageable limit) {
        return restaurantRepository.findAllByApprovedAndCuisineTypeId(approved, type, limit);
    }

    public Optional<Restaurant> findById(Long id) {
        return restaurantRepository.findById(id);
    }

}
