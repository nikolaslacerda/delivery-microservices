package com.server.deliveryrestaurantservice.repository;

import com.server.deliveryrestaurantservice.model.entity.MenuCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {

}
