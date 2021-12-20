package com.server.deliveryorderservice.amqp;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.MessageChannel;

import static com.server.deliveryorderservice.amqp.OrderConfig.*;

@EnableBinding(UpdateOrderSource.class)
@Configuration
public class OrderConfig {

    public static interface UpdateOrderSource {

        @Output
        public MessageChannel orderWithUpdatedStatus();
    }

}
