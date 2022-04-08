package com.server.deliveryrestaurantservice.repository;

import com.server.deliveryrestaurantservice.model.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    Optional<Menu> findByRestaurantId(Long restaurantId);
}
