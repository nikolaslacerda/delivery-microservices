package com.server.deliverypaymentservice.service;

import com.server.deliverypaymentservice.amqp.NotifierConfirmedPayment;
import com.server.deliverypaymentservice.exception.PaymentNotFoundException;
import com.server.deliverypaymentservice.mapper.PaymentMapper;
import com.server.deliverypaymentservice.model.dto.request.PaymentRequest;
import com.server.deliverypaymentservice.model.dto.response.PaymentResponse;
import com.server.deliverypaymentservice.model.entity.Payment;
import com.server.deliverypaymentservice.model.enumeration.PaymentStatus;
import com.server.deliverypaymentservice.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final NotifierConfirmedPayment paymentNotifier;

    public UUID createPayment(PaymentRequest paymentRequest) {
        Payment paymentToCreate = PaymentMapper.mapToModel(paymentRequest);
        paymentToCreate.setId(UUID.randomUUID());
        paymentToCreate.setStatus(PaymentStatus.CREATED);
        Payment createdPayment = paymentRepository.save(paymentToCreate);
        return createdPayment.getId();
    }

    public PaymentResponse getPayment(UUID paymentId) {
        return paymentRepository.findById(paymentId)
                .map(PaymentMapper::mapToResponse)
                .orElseThrow(() -> new PaymentNotFoundException(paymentId));
    }

    public PaymentResponse confirmPayment(UUID paymentId) {
        Payment foundPayment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new PaymentNotFoundException(paymentId));
        foundPayment.setStatus(PaymentStatus.CONFIRMED);
        paymentRepository.save(foundPayment);
        paymentNotifier.notifyConfirmedPayment(foundPayment);
        return PaymentMapper.mapToResponse(foundPayment);
    }

    public PaymentResponse cancelPayment(UUID paymentId) {
        Payment foundPayment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new PaymentNotFoundException(paymentId));
        foundPayment.setStatus(PaymentStatus.CANCELED);
        return PaymentMapper.mapToResponse(paymentRepository.save(foundPayment));
    }
}
