package com.server.deliverydistanceservice;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    Page<Restaurant> findAllByApprovedAndCuisineTypeId(boolean approved, Long cuisineTypeId, Pageable limit);

    Page<Restaurant> findAllByApproved(boolean approved, Pageable limit);
}

