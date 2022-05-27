package com.server.deliverypaymentservice.amqp;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.MessageChannel;

import static com.server.deliverypaymentservice.amqp.PaymentConfig.PaymentSource;

@Configuration
@EnableBinding(PaymentSource.class)
class PaymentConfig {

    interface PaymentSource {

        @Output
        MessageChannel confirmedPayments();
    }

}
