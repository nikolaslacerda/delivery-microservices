package com.server.deliveryorderservice.mapper;

import com.server.deliveryorderservice.model.dto.OrderItemDto;
import com.server.deliveryorderservice.model.entity.OrderItem;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ItemMapper {

    public static List<OrderItem> mapToModel(List<OrderItemDto> items) {
        return items.stream().map(ItemMapper::mapItemToModel).collect(Collectors.toList());
    }

    private static OrderItem mapItemToModel(OrderItemDto orderItem) {
        return OrderItem.builder()
                .id(orderItem.getId())
                .quantity(orderItem.getQuantity())
                .notes(orderItem.getNotes())
                .name(orderItem.getName())
                .description(orderItem.getDescription())
                .price(orderItem.getPrice())
                .promotionalPrice(orderItem.getPromotionalPrice())
                .totalPrice(orderItem.getTotalPrice())
                .totalPriceWithDiscount(orderItem.getTotalPriceWithDiscount())
                .build();
    }
}
