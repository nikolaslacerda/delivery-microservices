package com.server.deliveryorderservice.controller;

import com.server.deliveryorderservice.exception.ResourceNotFoundException;
import com.server.deliveryorderservice.mapper.OrderMapper;
import com.server.deliveryorderservice.model.dto.OrderDto;
import com.server.deliveryorderservice.model.entity.Order;
import com.server.deliveryorderservice.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.server.deliveryorderservice.amqp.OrderConfig.UpdateOrderSource;
import static com.server.deliveryorderservice.model.entity.Order.Status;

@RestController
@AllArgsConstructor
@RequestMapping("/orders")
public class OrderController {

    private OrderRepository orderRepository;
    private UpdateOrderSource updateOrderSource;

    @PostMapping
    public OrderDto createOrder(@RequestBody Order order) {
        //DTO COM MAPPER DEFAULT
        order.setDateTime(LocalDateTime.now());
        order.setStatus(Status.SUBMITTED);
        order.getItems().forEach(item -> item.setOrder(order));
        order.getDelivery().setOrder(order);
        Order savedOrder = orderRepository.save(order);
        return OrderMapper.mapToDto(savedOrder);
    }

    @GetMapping
    public List<OrderDto> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(OrderMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public OrderDto getOrderById(@PathVariable("id") Long id) {
        Order order = orderRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return OrderMapper.mapToDto(order);
    }

    @PutMapping("/{id}/status")
    public OrderDto updateStatus(@RequestBody Order order) {
        orderRepository.updateStatus(order.getStatus(), order);
        OrderDto dto = OrderMapper.mapToDto(order);
        updateOrderSource.orderWithUpdatedStatus().send(MessageBuilder.withPayload(dto).build());
        return dto;
    }

    @PutMapping("/{id}/paid")
    public void setPaid(@PathVariable("id") Long id) {
        Order order = orderRepository.findOrderItems(id);
        if (order == null) {
            throw new ResourceNotFoundException();
        }
        order.setStatus(Status.PAID);
        orderRepository.updateStatus(Status.PAID, order);

        OrderDto dto = OrderMapper.mapToDto(order);
        updateOrderSource.orderWithUpdatedStatus().send(MessageBuilder.withPayload(dto).build());
    }

    @GetMapping("/pending/restaurant/{restaurantId}")
    public List<OrderDto> getPendingOrders(@PathVariable("restaurantId") Long restaurantId) {
        return orderRepository.findByRestaurantWithoutStatus(restaurantId, Arrays.asList(Status.SUBMITTED, Status.DELIVERED))
                .stream()
                .map(OrderMapper::mapToDto)
                .collect(Collectors.toList());
    }

}
