package com.server.deliverypaymentservice;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(url = "${delivery.order.service.url}", name = "order")
public interface OrderRestClient {

    @PutMapping("/orders/{orderId}/paid")
    void sendPaidStatus(@PathVariable("orderId") Long orderId);

}
