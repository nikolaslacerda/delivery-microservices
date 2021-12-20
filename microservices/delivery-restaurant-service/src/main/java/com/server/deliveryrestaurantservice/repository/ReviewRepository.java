package com.server.deliveryrestaurantservice.repository;

import com.server.deliveryrestaurantservice.model.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query(value = "SELECT avg(score) FROM review\n" +
            "INNER JOIN `order` on review.order_id=`order`.id\n" +
            "WHERE restaurant_id = :restaurantId", nativeQuery = true)
    Double findRestaurantAverageScore(@Param("restaurantId") Long restaurantId);

    @Query(value = "SELECT review.id, comment, score, order_id FROM review\n" +
            "INNER JOIN `order` on review.order_id=`order`.id\n" +
            "WHERE restaurant_id = :restaurantId", nativeQuery = true)
    List<Review> findAllReviewsByRestaurant(@Param("restaurantId") Long restaurantId);

}
