package com.server.deliveryrestaurantservice.repository;

import com.server.deliveryrestaurantservice.model.entity.PaymentMethod;
import com.server.deliveryrestaurantservice.model.entity.RestaurantPaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantPaymentMethodRepository extends JpaRepository<RestaurantPaymentMethod, RestaurantPaymentMethod.PaymentMethodIdKey> {

    @Query("select rf.paymentMethod from RestaurantPaymentMethod rf join rf.restaurant r where r.id = :restaurantId")
    List<PaymentMethod> findAllByRestaurantOrderByNomeAsc(@Param("restaurantId") Long restaurantId);

}
