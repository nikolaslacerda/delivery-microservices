package com.server.deliverypaymentservice.repository;

import com.server.deliverypaymentservice.model.entity.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface PaymentRepository extends MongoRepository<Payment, UUID> {

}
