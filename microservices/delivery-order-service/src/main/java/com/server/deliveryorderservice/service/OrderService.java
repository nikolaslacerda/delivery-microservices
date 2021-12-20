package com.server.deliveryorderservice.service;

import com.server.deliveryorderservice.model.entity.Order;
import com.server.deliveryorderservice.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import static com.server.deliveryorderservice.model.entity.Order.Status;

@Service
@AllArgsConstructor
public class OrderService {

    private OrderRepository orderRepository;

    public Order getById(Long orderId) {
        return orderRepository.findOrderItems(orderId);
    }

    public void updateStatus(Status status, Order order) {
        orderRepository.updateStatus(status, order);
    }

}
