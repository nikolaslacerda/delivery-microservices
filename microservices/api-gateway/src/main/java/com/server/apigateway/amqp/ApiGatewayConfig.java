package com.server.apigateway.amqp;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.Input;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.SubscribableChannel;

import static com.server.apigateway.amqp.ApiGatewayConfig.UpdateOrderSink;

@EnableBinding(UpdateOrderSink.class)
@Configuration
public class ApiGatewayConfig {

    public static interface UpdateOrderSink {

        String ORDER_WITH_UPDATED_STATUS = "orderWithUpdatedStatus";

        @Input
        SubscribableChannel orderWithUpdatedStatus();
    }

}
