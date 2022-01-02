package com.server.deliveryorderservice.mapper;

import com.server.deliveryorderservice.model.dto.OrderDto;
import com.server.deliveryorderservice.model.entity.Order;

public class OrderMapper {

    public static OrderDto mapToDto (Order order) {
        return OrderDto.builder()
                .id(order.getId())
                .dateTime(order.getDateTime())
                .status(order.getStatus())
                .restaurantId(order.getRestaurantId())
                .delivery(DeliveryMapper.mapToDto(order.getDelivery()))
                .items(OrderItemMapper.mapItemsToDto(order.getItems()))
                .build();
    }

}
