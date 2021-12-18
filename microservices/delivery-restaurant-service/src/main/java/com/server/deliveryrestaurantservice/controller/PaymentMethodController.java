package com.server.deliveryrestaurantservice.controller;

import com.server.deliveryrestaurantservice.model.entity.RestaurantPaymentMethod;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.repository.PaymentMethodRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
class PaymentMethodController {

    private PaymentMethodRepository paymentMethodRepository;

    @PostMapping("/partners/restaurants/{idRestaurant}/payment-methods")
    public void createRestaurantPaymentMethod(@PathVariable("idRestaurant") Long idRestaurant,
                                              @RequestBody Long paymentMethodId) {
        RestaurantPaymentMethod.PaymentMethodId id = new RestaurantPaymentMethod.PaymentMethodId(idRestaurant, paymentMethodId);
        Restaurant restaurant = new Restaurant();
        restaurant.setId(idRestaurant);
        RestaurantPaymentMethod restaurantPaymentMethod = new RestaurantPaymentMethod(id, restaurant, paymentMethodId);
        paymentMethodRepository.save(restaurantPaymentMethod);
    }

    @GetMapping("/restaurants/{idRestaurant}/payment-methods")
    public List<Long> getRestaurantPaymentMethods(@PathVariable("idRestaurant") Long idRestaurant) {
        Restaurant restaurant = new Restaurant();
        restaurant.setId(idRestaurant);
        return paymentMethodRepository.findAllByRestaurantOrderByNomeAsc(restaurant);
    }

    @DeleteMapping("/partners/restaurants/{idRestaurant}/payment-methods/{paymentMethodId}")
    public void deleteRestaurantPaymentMethod(@PathVariable("idRestaurant") Long idRestaurant,
                                              @PathVariable("paymentMethodId") Long paymentMethodId) {
        RestaurantPaymentMethod.PaymentMethodId id = new RestaurantPaymentMethod.PaymentMethodId(idRestaurant, paymentMethodId);
        paymentMethodRepository.deleteById(id);
    }

}
