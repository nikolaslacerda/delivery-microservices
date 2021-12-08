package com.server.deliverypaymentservice.amqp;

import com.server.deliverypaymentservice.amqp.model.ConfirmedPayment;
import com.server.deliverypaymentservice.model.Payment;
import lombok.AllArgsConstructor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import static com.server.deliverypaymentservice.amqp.PaymentConfig.*;

@Service
@AllArgsConstructor
public class NotifierConfirmedPayment {

    private PaymentSource source;

    public void notifyConfirmedPayment(Payment payment) {
        Long paymentId = payment.getId();
        Long orderId = payment.getOrderId();
        ConfirmedPayment confirmedPayment = new ConfirmedPayment(paymentId, orderId);
        source.confirmedPayments().send(MessageBuilder.withPayload(confirmedPayment).build());
    }

}
