package com.server.deliveryorderservice.service;

import com.server.deliveryorderservice.amqp.NotifierUpdatedOrderStatus;
import com.server.deliveryorderservice.exception.OrderNotFoundException;
import com.server.deliveryorderservice.exception.OrderStatusUpdateException;
import com.server.deliveryorderservice.integration.PaymentRestClient;
import com.server.deliveryorderservice.mapper.OrderMapper;
import com.server.deliveryorderservice.mapper.PaymentMapper;
import com.server.deliveryorderservice.model.dto.request.OrderRequest;
import com.server.deliveryorderservice.model.dto.request.StatusRequest;
import com.server.deliveryorderservice.model.dto.response.OrderResponse;
import com.server.deliveryorderservice.model.dto.response.PaymentResponse;
import com.server.deliveryorderservice.model.entity.Order;
import com.server.deliveryorderservice.model.enumerations.Status;
import com.server.deliveryorderservice.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final PaymentRestClient paymentRestClient;
    private final NotifierUpdatedOrderStatus updatedOrderStatusNotifier;

    @Transactional
    public OrderResponse createOrder(OrderRequest orderRequest) {
        Order order = OrderMapper.mapToModel(orderRequest);
        order.setCreatedAt(LocalDateTime.now());
        order.setLastStatus(Status.RECEIVED);
        order.setReviewed(false);
        order.setId(UUID.randomUUID());
        Order savedOrder = orderRepository.save(order);
        PaymentResponse createdPayment = paymentRestClient.createPayment(PaymentMapper.mapToRequest(savedOrder, orderRequest.getPayment()));
        order.setPaymentId(createdPayment.getContent());
        return OrderMapper.mapToResponse(orderRepository.save(order));
    }

    public List<OrderResponse> getCustomerOrders(UUID customerId) {
        return orderRepository.findAllByCustomerId(customerId)
                .stream()
                .map(OrderMapper::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<OrderResponse> getRestaurantOrders(Long restaurantId) {
        return orderRepository.findAllByRestaurantId(restaurantId)
                .stream()
                .map(OrderMapper::mapToResponse)
                .collect(Collectors.toList());
    }

    public OrderResponse getOrderById(UUID id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));
        return OrderMapper.mapToResponse(order);
    }

    public void updateStatus(UUID id, StatusRequest statusRequest) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));
        validateStatus(order.getLastStatus(), statusRequest.getStatus());
        order.setLastStatus(statusRequest.getStatus());
        order.setUpdatedAt(LocalDateTime.now());
        Order savedOrder = orderRepository.save(order);
        updatedOrderStatusNotifier.notifyOrderWithUpdatedStatus(savedOrder);
    }

    private void validateStatus(Status lastStatus, Status newStatus) {
        if (lastStatus.getId() > newStatus.getId())
            throw new OrderStatusUpdateException(lastStatus.getValue(), newStatus.getValue());
    }
}
