package com.server.deliveryorderservice.amqp;

import com.server.deliveryorderservice.model.entity.Order;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import static com.server.deliveryorderservice.amqp.OrderConfig.UpdateOrderSource;

@Slf4j
@Service
@AllArgsConstructor
public class NotifierUpdatedOrderStatus {

    private UpdateOrderSource source;

    public void notifyOrderWithUpdatedStatus(Order order) {
        log.info("Updated Order Status Send: {}", order);
        source.orderWithUpdatedStatus().send(MessageBuilder.withPayload(order).build());
    }

}
