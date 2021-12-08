package com.server.deliverypaymentservice.amqp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConfirmedPayment {

    private Long paymentId;
    private Long orderId;

}
