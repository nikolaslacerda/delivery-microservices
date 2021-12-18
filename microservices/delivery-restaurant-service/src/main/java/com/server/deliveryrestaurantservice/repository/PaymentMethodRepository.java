package com.server.deliveryrestaurantservice.repository;

import com.server.deliveryrestaurantservice.model.entity.RestaurantPaymentMethod;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentMethodRepository extends JpaRepository<RestaurantPaymentMethod, RestaurantPaymentMethod.PaymentMethodId> {

    @Query("select rf.paymentMethodId from RestaurantPaymentMethod rf join rf.restaurant r where r = :restaurant")
    List<Long> findAllByRestaurantOrderByNomeAsc(@Param("restaurant") Restaurant restaurant);

}
