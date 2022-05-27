package com.server.deliverypaymentservice.amqp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConfirmedPayment {

    private UUID paymentId;
    private UUID orderId;

}
