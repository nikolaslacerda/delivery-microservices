package com.server.deliveryorderservice.controller;

import com.server.deliveryorderservice.model.dto.request.OrderRequest;
import com.server.deliveryorderservice.model.dto.request.StatusRequest;
import com.server.deliveryorderservice.model.dto.response.OrderResponse;
import com.server.deliveryorderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public OrderResponse createOrder(@Valid @RequestBody OrderRequest orderRequest) {
        return orderService.createOrder(orderRequest);
    }

    @GetMapping("/customer/{customerId}")
    public List<OrderResponse> getCustomerOrders(@PathVariable UUID customerId) {
        return orderService.getCustomerOrders(customerId);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public List<OrderResponse> getRestaurantOrders(@PathVariable Long restaurantId) {
        return orderService.getRestaurantOrders(restaurantId);
    }

    @GetMapping("/{id}")
    public OrderResponse getOrderById(@PathVariable UUID id) {
        return orderService.getOrderById(id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PatchMapping("/{id}/status")
    public void updateStatus(@PathVariable UUID id, @Valid @RequestBody StatusRequest statusRequest) {
        orderService.updateStatus(id, statusRequest);
    }

}
