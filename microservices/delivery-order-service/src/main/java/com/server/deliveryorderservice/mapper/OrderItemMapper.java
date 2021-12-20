package com.server.deliveryorderservice.mapper;

import com.server.deliveryorderservice.model.dto.OrderItemDto;
import com.server.deliveryorderservice.model.entity.OrderItem;

import java.util.List;
import java.util.stream.Collectors;

public class OrderItemMapper {

    public static List<OrderItemDto> mapItemsToDto(List<OrderItem> items) {
        return items.stream().map(OrderItemMapper::mapItemToDto).collect(Collectors.toList());
    }

    private static OrderItemDto mapItemToDto(OrderItem orderItem) {
        return OrderItemDto.builder()
                .id(orderItem.getId())
                .quantity(orderItem.getQuantity())
                .observation(orderItem.getObservation())
                .menuItemId(orderItem.getMenuItemId())
                .build();
    }
}
