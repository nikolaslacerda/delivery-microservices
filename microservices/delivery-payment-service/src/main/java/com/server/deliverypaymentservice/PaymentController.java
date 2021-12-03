package com.server.deliverypaymentservice;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@AllArgsConstructor
@RequestMapping("/payment")
class PaymentController {

    private PaymentRepository paymentRepository;

    @GetMapping("/{id}")
    public PaymentDto detail(@PathVariable("id") Long id) {
        Payment payment = paymentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return new PaymentDto(payment);
    }

    @PostMapping
    public ResponseEntity<PaymentDto> create(@RequestBody Payment payment, UriComponentsBuilder uriBuilder) {
        payment.setStatus(Payment.Status.CREATED);
        Payment savedPayment = paymentRepository.save(payment);
        URI path = uriBuilder.path("/payment/{id}").buildAndExpand(savedPayment.getId()).toUri();
        return ResponseEntity.created(path).body(new PaymentDto(savedPayment));
    }

    @PutMapping("/{id}")
    public PaymentDto confirm(@PathVariable("id") Long id) {
        Payment payment = paymentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        payment.setStatus(Payment.Status.CONFIRM);
        paymentRepository.save(payment);
        return new PaymentDto(payment);
    }

    @DeleteMapping("/{id}")
    public PaymentDto cancel(@PathVariable("id") Long id) {
        Payment payment = paymentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        payment.setStatus(Payment.Status.CANCELED);
        paymentRepository.save(payment);
        return new PaymentDto(payment);
    }

}