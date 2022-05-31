package com.server.deliveryorderservice.integration;

import com.server.deliveryorderservice.model.dto.request.PaymentRequest;
import com.server.deliveryorderservice.model.dto.response.PaymentResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("payment-service")
public interface PaymentRestClient {

    @PostMapping("/payment")
    PaymentResponse createPayment(@RequestBody PaymentRequest paymentRequest);

}
