package com.server.deliveryorderservice.amqp;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.MessageChannel;

import static com.server.deliveryorderservice.amqp.OrderConfig.UpdateOrderSource;

@Configuration
@EnableBinding(UpdateOrderSource.class)
public class OrderConfig {

    interface UpdateOrderSource {

        @Output
        MessageChannel orderWithUpdatedStatus();
    }

}

