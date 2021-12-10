package com.server.deliverydistanceservice.repository;

import com.server.deliverydistanceservice.model.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RestaurantRepository extends MongoRepository<Restaurant, String> {

    Page<Restaurant> findAllByCuisineTypeId(Long cuisineTypeId, Pageable limit);

    Page<Restaurant> findAll(Pageable limit);
}

