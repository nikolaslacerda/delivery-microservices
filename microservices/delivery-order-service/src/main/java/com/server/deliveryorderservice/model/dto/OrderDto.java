package com.server.deliveryorderservice.model.dto;

import com.server.deliveryorderservice.model.dto.DeliveryDto;
import com.server.deliveryorderservice.model.dto.OrderItemDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.server.deliveryorderservice.model.entity.Order.Status;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {

    private Long id;
    private LocalDateTime dateTime;
    private Status status;
    private Long restaurantId;
    private DeliveryDto delivery;
    private List<OrderItemDto> items = new ArrayList<>();

    public BigDecimal getTotal() {
        return BigDecimal.ONE;
//		BigDecimal total = restaurante.getTaxaDeEntregaEmReais() != null ? restaurante.getTaxaDeEntregaEmReais() : BigDecimal.ZERO;
//		for (OrderItemDto item : items) {
//			BigDecimal price = item.getItemDoCardapio().getPrecoPromocional() != null ? item.getItemDoCardapio().getPrecoPromocional() : item.getItemDoCardapio().getPreco() ;
//			total = total.add(price.multiply(new BigDecimal(item.getQuantity())));
//		}
//		return total;
    }
}
