package com.server.deliveryrestaurantservice.repository;

import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findAllByActive(boolean active);

    Page<Restaurant> findAllByActiveAndCuisineTypeId(boolean active, Long typeId, Pageable limit);

    Page<Restaurant> findAllByActive(boolean active, Pageable limit);

    Optional<Restaurant> findByPartnerId(UUID partnerId);

    @Modifying(clearAutomatically = true)
    @Query("update Restaurant r set r.active = true where r.id = :id")
    void approveById(@Param("id") Long id);

}
