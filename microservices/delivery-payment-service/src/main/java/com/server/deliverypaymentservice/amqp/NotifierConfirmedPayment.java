package com.server.deliverypaymentservice.amqp;

import com.server.deliverypaymentservice.amqp.model.ConfirmedPayment;
import com.server.deliverypaymentservice.model.entity.Payment;
import lombok.AllArgsConstructor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import static com.server.deliverypaymentservice.amqp.PaymentConfig.PaymentSource;

@Service
@AllArgsConstructor
public class NotifierConfirmedPayment {

    private PaymentSource source;

    public void notifyConfirmedPayment(Payment payment) {
        ConfirmedPayment confirmedPayment = new ConfirmedPayment(payment.getId(), payment.getOrderId());
        source.confirmedPayments().send(MessageBuilder.withPayload(confirmedPayment).build());
    }

}
