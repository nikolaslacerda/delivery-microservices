package com.server.deliveryadminservice.controller;

import com.server.deliveryadminservice.model.PaymentMethod;
import com.server.deliveryadminservice.model.PaymentMethodDto;
import com.server.deliveryadminservice.repository.PaymentMethodRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@AllArgsConstructor
class PaymentMethodController {

    private PaymentMethodRepository paymentMethodRepository;

    @GetMapping("/payment-methods")
    public List<PaymentMethodDto> getAll() {
        log.info("Called: Get all payment methods");
        return paymentMethodRepository.findAllByOrderByNameAsc()
                .stream()
                .map(PaymentMethodDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/admin/payment-methods/types")
    public List<PaymentMethod.Type> getTypes() {
        return Arrays.asList(PaymentMethod.Type.values());
    }

    @PostMapping("/admin/payment-methods")
    public PaymentMethodDto create(@RequestBody PaymentMethod tipoDeCozinha) {
        return new PaymentMethodDto(paymentMethodRepository.save(tipoDeCozinha));
    }

    @PutMapping("/admin/payment-methods/{id}")
    public PaymentMethodDto update(@RequestBody PaymentMethod tipoDeCozinha) {
        return new PaymentMethodDto(paymentMethodRepository.save(tipoDeCozinha));
    }

    @DeleteMapping("/admin/payment-methods/{id}")
    public void delete(@PathVariable("id") Long id) {
        paymentMethodRepository.deleteById(id);
    }

}
