package com.server.deliverydistanceservice;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RestaurantRepository extends MongoRepository<Restaurant, Long> {

    Page<Restaurant> findAllByCuisineTypeId(Long cuisineTypeId, Pageable limit);

    Page<Restaurant> findAll(Pageable limit);
}

