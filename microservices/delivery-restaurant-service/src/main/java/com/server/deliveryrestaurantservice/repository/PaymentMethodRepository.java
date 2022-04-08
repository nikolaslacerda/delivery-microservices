package com.server.deliveryrestaurantservice.repository;

import com.server.deliveryrestaurantservice.model.entity.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {
}
