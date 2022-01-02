package com.server.deliveryadminservice.repository;

import com.server.deliveryadminservice.model.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {

    List<PaymentMethod> findAllByOrderByNameAsc();

}
