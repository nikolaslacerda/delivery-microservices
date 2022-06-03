package com.server.deliveryorderservice.repository;

import com.server.deliveryorderservice.model.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends MongoRepository<Order, UUID> {

    List<Order> findAllByCustomerId(UUID customerId);

    List<Order> findAllByRestaurantId(Long restaurantId);
}
