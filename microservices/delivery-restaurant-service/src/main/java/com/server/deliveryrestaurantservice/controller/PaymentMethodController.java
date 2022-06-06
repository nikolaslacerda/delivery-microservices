package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.model.dto.request.PaymentMethodRequest;
import com.server.deliveryrestaurantservice.model.dto.response.PaymentMethodResponse;
import com.server.deliveryrestaurantservice.service.PaymentMethodService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
class PaymentMethodController {

    private final PaymentMethodService paymentMethodService;

    @PostMapping("/partners/restaurants/{restaurantId}/payment-methods")
    public PaymentMethodResponse createRestaurantPaymentMethod(@PathVariable Long restaurantId,
                                                               @Valid @RequestBody PaymentMethodRequest paymentMethod) {
        return paymentMethodService.createRestaurantPaymentMethod(restaurantId, paymentMethod);
    }

    @GetMapping("/partners/payment-methods")
    public List<PaymentMethodResponse> getPaymentMethods() {
        return paymentMethodService.getPaymentMethods();
    }

    @GetMapping("/restaurants/{restaurantId}/payment-methods")
    public List<PaymentMethodResponse> getRestaurantPaymentMethods(@PathVariable Long restaurantId) {
        return paymentMethodService.getRestaurantPaymentMethods(restaurantId);
    }

    @DeleteMapping("/partners/restaurants/{restaurantId}/payment-methods/{paymentMethodId}")
    public void deleteRestaurantPaymentMethod(@PathVariable Long restaurantId,
                                              @PathVariable Long paymentMethodId) {
        paymentMethodService.deleteRestaurantPaymentMethod(restaurantId, paymentMethodId);
    }

}
