package com.server.deliverypaymentservice.repository;

import com.server.deliverypaymentservice.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
