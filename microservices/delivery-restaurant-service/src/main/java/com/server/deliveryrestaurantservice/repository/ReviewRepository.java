package com.server.deliveryrestaurantservice.repository;

import com.server.deliveryrestaurantservice.model.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query(value = "SELECT avg(user_rating) FROM review\n" +
            "INNER JOIN `order` on review.order_id=`order`.id\n" +
            "WHERE restaurant_id = :restaurantId", nativeQuery = true)
    Double findRestaurantAverageScore(@Param("restaurantId") Long restaurantId);

    @Query(value = "SELECT id, name, comment, created_at, user_rating, order_id, restaurant_id FROM review WHERE restaurant_id = :restaurantId",
            countQuery = "SELECT count(*) FROM review WHERE restaurant_id = :restaurantId",
            nativeQuery = true)
    Page<Review> findAllReviewsByRestaurant(@Param("restaurantId") Long restaurantId, Pageable pageable);

}
