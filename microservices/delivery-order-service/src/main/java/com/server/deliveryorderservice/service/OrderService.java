package com.server.deliveryorderservice.service;

import com.server.deliveryorderservice.amqp.NotifierUpdatedOrderStatus;
import com.server.deliveryorderservice.exception.EntityNotFoundException;
import com.server.deliveryorderservice.mapper.OrderMapper;
import com.server.deliveryorderservice.model.dto.request.OrderRequest;
import com.server.deliveryorderservice.model.dto.request.StatusRequest;
import com.server.deliveryorderservice.model.dto.response.OrderResponse;
import com.server.deliveryorderservice.model.entity.Order;
import com.server.deliveryorderservice.model.enumerations.Status;
import com.server.deliveryorderservice.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final NotifierUpdatedOrderStatus updatedOrderStatusNotifier;

    public OrderResponse createOrder(OrderRequest orderRequest) {
        Order order = OrderMapper.mapToModel(orderRequest);
        order.setCreatedAt(LocalDateTime.now());
        order.setLastStatus(Status.RECEIVED);
        order.setReviewed(false);
        order.setId(UUID.randomUUID());
        return OrderMapper.mapToResponse(orderRepository.save(order));
    }

    public List<OrderResponse> getCustomerOrders(UUID customerId) {
        return orderRepository.findAllByCustomerId(customerId)
                .stream()
                .map(OrderMapper::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<OrderResponse> getRestaurantOrders(UUID restaurantId) {
        return orderRepository.findAllByRestaurantId(restaurantId)
                .stream()
                .map(OrderMapper::mapToResponse)
                .collect(Collectors.toList());
    }

    public OrderResponse getOrderById(UUID id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);
        return OrderMapper.mapToResponse(order);
    }

    public void updateStatus(UUID id, StatusRequest statusRequest) {
        Order order = orderRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);
        validateStatus(order.getLastStatus(), statusRequest.getStatus());
        order.setLastStatus(statusRequest.getStatus());
        order.setUpdatedAt(LocalDateTime.now());
        Order savedOrder = orderRepository.save(order);
        updatedOrderStatusNotifier.notifyOrderWithUpdatedStatus(savedOrder);
    }

    private void validateStatus(Status lastStatus, Status newStatus) {
        if (lastStatus.getId() > newStatus.getId())
            throw new RuntimeException("Cannot change status from " + lastStatus.getValue() + " to " + newStatus.getValue());
    }
}
