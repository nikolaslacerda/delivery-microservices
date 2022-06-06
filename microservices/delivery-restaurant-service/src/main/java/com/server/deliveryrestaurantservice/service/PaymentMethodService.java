package com.server.deliveryrestaurantservice.service;

import com.server.deliveryrestaurantservice.mapper.PaymentMethodMapper;
import com.server.deliveryrestaurantservice.model.dto.request.PaymentMethodRequest;
import com.server.deliveryrestaurantservice.model.dto.response.PaymentMethodResponse;
import com.server.deliveryrestaurantservice.model.entity.PaymentMethod;
import com.server.deliveryrestaurantservice.model.entity.Restaurant;
import com.server.deliveryrestaurantservice.model.entity.RestaurantPaymentMethod;
import com.server.deliveryrestaurantservice.repository.PaymentMethodRepository;
import com.server.deliveryrestaurantservice.repository.RestaurantPaymentMethodRepository;
import com.server.deliveryrestaurantservice.repository.RestaurantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PaymentMethodService {

    private final RestaurantPaymentMethodRepository restaurantPaymentMethodRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final RestaurantRepository restaurantRepository;

    public PaymentMethodResponse createRestaurantPaymentMethod(Long restaurantId, PaymentMethodRequest paymentMethod) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(EntityNotFoundException::new);
        PaymentMethod paymentMethod1 = paymentMethodRepository.findById(paymentMethod.getPaymentMethodId())
                .orElseThrow(EntityNotFoundException::new);
        RestaurantPaymentMethod restaurantPaymentMethod = new RestaurantPaymentMethod(restaurantId, paymentMethod.getPaymentMethodId());
        restaurantPaymentMethod.setPaymentMethod(paymentMethod1);
        restaurantPaymentMethod.setRestaurant(restaurant);
        return PaymentMethodMapper.mapRestaurantPaymentToDto(restaurantPaymentMethodRepository.save(restaurantPaymentMethod));
    }

    public List<PaymentMethodResponse> getRestaurantPaymentMethods(Long restaurantId) {
        return restaurantPaymentMethodRepository.findAllByRestaurantOrderByNomeAsc(restaurantId)
                .stream()
                .map(PaymentMethodMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public void deleteRestaurantPaymentMethod(Long restaurantId, Long paymentMethodId) {
        RestaurantPaymentMethod.PaymentMethodIdKey id = new RestaurantPaymentMethod.PaymentMethodIdKey(restaurantId, paymentMethodId);
        restaurantPaymentMethodRepository.deleteById(id);
    }

    public List<PaymentMethodResponse> getPaymentMethods() {
        return paymentMethodRepository.findAll()
                .stream()
                .map(PaymentMethodMapper::mapToDto)
                .collect(Collectors.toList());
    }
}
