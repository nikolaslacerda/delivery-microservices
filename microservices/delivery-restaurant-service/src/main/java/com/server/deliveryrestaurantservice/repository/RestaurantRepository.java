package com.server.deliveryrestaurantservice.repository;

import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findAllByApproved(boolean approved);

    Page<Restaurant> findAllByApprovedAndCuisineTypeId(boolean approved, Long typeId, Pageable limit);

    Page<Restaurant> findAllByApproved(boolean approved, Pageable limit);

    Restaurant findByUserId(Long userId);

    @Query(value = "SELECT * FROM restaurant\n" +
            "INNER JOIN user on restaurant.user_id = user.id\n", nativeQuery = true)
    Restaurant findByUsername(String userId);

    @Modifying(clearAutomatically = true)
    @Query("update Restaurant r set r.approved = true where r.id = :id")
    void approveById(@Param("id") Long id);

}
