package com.server.deliveryrestaurantservice.repository;

import com.server.deliveryrestaurantservice.model.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long>  {

}
