package com.server.deliverypaymentservice.integration;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient("monolith")
public interface OrderRestClient {

    @PutMapping("/orders/{orderId}/paid")
    void sendPaidStatus(@PathVariable("orderId") Long orderId);

}
