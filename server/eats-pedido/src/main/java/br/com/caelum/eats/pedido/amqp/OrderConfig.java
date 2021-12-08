package br.com.caelum.eats.pedido.amqp;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.MessageChannel;

import static br.com.caelum.eats.pedido.amqp.OrderConfig.UpdateOrderSource;

@EnableBinding(UpdateOrderSource.class)
@Configuration
public class OrderConfig {

    public static interface UpdateOrderSource {

        @Output
        MessageChannel orderWithUpdatedStatus();
    }

}
