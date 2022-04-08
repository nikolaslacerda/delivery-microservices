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

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findAllByActive(boolean active);

    Page<Restaurant> findAllByActiveAndCuisineTypeId(boolean active, Long typeId, Pageable limit);

    Page<Restaurant> findAllByActive(boolean active, Pageable limit);

    Restaurant findByPartnerId(Long userId);

    @Query(value = "SELECT * FROM restaurant\n" +
            "INNER JOIN user on restaurant.partner_id = user.id\n", nativeQuery = true)
    Optional<Restaurant> findByUsername(String userId);

    @Modifying(clearAutomatically = true)
    @Query("update Restaurant r set r.active = true where r.id = :id")
    void approveById(@Param("id") Long id);

}
