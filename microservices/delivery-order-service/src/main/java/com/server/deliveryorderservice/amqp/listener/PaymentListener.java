package com.server.deliveryorderservice.amqp.listener;

import com.server.deliveryorderservice.model.dto.request.StatusRequest;
import com.server.deliveryorderservice.model.enumerations.Status;
import com.server.deliveryorderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

import static com.server.deliveryorderservice.amqp.PaymentConfig.PaymentSink;

@Service
@RequiredArgsConstructor
public class PaymentListener {

    private final OrderService orderService;

    @StreamListener(PaymentSink.CONFIRMED_PAYMENTS)
    void processSuccessfulPayment(Map<String, UUID> successfulPayment) {
        System.out.println("Confirmed payment received: " + successfulPayment);
        orderService.updateStatus(successfulPayment.get("orderId"), new StatusRequest(Status.PAID));
    }

}
