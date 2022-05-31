package com.server.deliverypaymentservice.repository;

import com.server.deliverypaymentservice.model.entity.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PaymentRepository extends MongoRepository<Payment, UUID> {

}
