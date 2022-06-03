package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.model.dto.request.PaymentMethodRequest;
import com.server.deliveryrestaurantservice.model.dto.response.PaymentMethodResponse;
import com.server.deliveryrestaurantservice.service.PaymentMethodService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
class PaymentMethodController {

    private final PaymentMethodService paymentMethodService;

    @PostMapping("/partners/restaurants/{restaurantId}/payment-methods")
    public PaymentMethodResponse createRestaurantPaymentMethod(@PathVariable("restaurantId") Long restaurantId,
                                                               @RequestBody PaymentMethodRequest paymentMethod) {
        return paymentMethodService.createRestaurantPaymentMethod(restaurantId, paymentMethod);
    }

    @GetMapping("/partners/payment-methods")
    public List<PaymentMethodResponse> getPaymentMethods() {
        return paymentMethodService.getPaymentMethods();
    }

    @GetMapping("/restaurants/{restaurantId}/payment-methods")
    public List<PaymentMethodResponse> getRestaurantPaymentMethods(@PathVariable("restaurantId") Long restaurantId) {
        return paymentMethodService.getRestaurantPaymentMethods(restaurantId);
    }

    @DeleteMapping("/partners/restaurants/{restaurantId}/payment-methods/{paymentMethodId}")
    public void deleteRestaurantPaymentMethod(@PathVariable("restaurantId") Long restaurantId,
                                              @PathVariable("paymentMethodId") Long paymentMethodId) {
        paymentMethodService.deleteRestaurantPaymentMethod(restaurantId, paymentMethodId);
    }

}
