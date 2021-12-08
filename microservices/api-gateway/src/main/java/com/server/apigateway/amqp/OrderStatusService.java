package com.server.apigateway.amqp;

import lombok.AllArgsConstructor;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

import static com.server.apigateway.amqp.ApiGatewayConfig.UpdateOrderSink;

@Service
@AllArgsConstructor
class OrderStatusService {

    private SimpMessagingTemplate websocket;

    @StreamListener(UpdateOrderSink.ORDER_WITH_UPDATED_STATUS)
    void updatedOrder(Map<String, Object> order) {

        websocket.convertAndSend("/orders/" + order.get("id") + "/status", order);

        if ("PAID".equals(order.get("status"))) {
            Map<String, Object> restaurant = (Map<String, Object>) order.get("restaurant");
            websocket.convertAndSend("/partners/restaurants/" + restaurant.get("id") + "/orders/pending", order);
        }

    }

}
