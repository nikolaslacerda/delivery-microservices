package com.server.amqp;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.Input;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.SubscribableChannel;

import static com.server.amqp.ReceiptConfig.PaymentSink;

@EnableBinding(PaymentSink.class)
@Configuration
public class ReceiptConfig {

    public static interface PaymentSink {
        String CONFIRMED_PAYMENTS = "confirmedPayments";

        @Input
        SubscribableChannel confirmedPayments();
    }

}