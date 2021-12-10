package com.server.deliverypaymentservice.controller;

import com.server.deliverypaymentservice.amqp.NotifierConfirmedPayment;
import com.server.deliverypaymentservice.exception.ResourceNotFoundException;
import com.server.deliverypaymentservice.integration.OrderRestClient;
import com.server.deliverypaymentservice.model.Payment;
import com.server.deliverypaymentservice.model.PaymentDto;
import com.server.deliverypaymentservice.repository.PaymentRepository;
import lombok.AllArgsConstructor;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;


@RestController
@AllArgsConstructor
@RequestMapping("/payment")
public class PaymentController {

    private PaymentRepository paymentRepository;
    private OrderRestClient orderRestClient;
    private NotifierConfirmedPayment paymentNotifier;

    @GetMapping("/{id}")
    public Resource<PaymentDto> detail(@PathVariable("id") Long id) {
        Payment payment = paymentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

        List<Link> links = new ArrayList<>();

        Link self = linkTo(methodOn(PaymentController.class).detail(id)).withSelfRel();
        links.add(self);

        if (Payment.Status.CREATED.equals(payment.getStatus())) {
            Link confirm = linkTo(methodOn(PaymentController.class).confirm(id)).withRel("confirm");
            links.add(confirm);

            Link cancel = linkTo(methodOn(PaymentController.class).cancel(id)).withRel("cancel");
            links.add(cancel);
        }

        PaymentDto dto = new PaymentDto(payment);
        return new Resource<>(dto, links);
    }

    @PostMapping
    public ResponseEntity<Resource<PaymentDto>> create(@RequestBody Payment payment,
                                                       UriComponentsBuilder uriBuilder) {
        payment.setStatus(Payment.Status.CREATED);
        Payment salvo = paymentRepository.save(payment);
        URI path = uriBuilder.path("/payment/{id}").buildAndExpand(salvo.getId()).toUri();
        PaymentDto dto = new PaymentDto(salvo);

        Long id = salvo.getId();

        List<Link> links = new ArrayList<>();

        Link self = linkTo(methodOn(PaymentController.class).detail(id)).withSelfRel();
        links.add(self);

        Link confirm = linkTo(methodOn(PaymentController.class).confirm(id)).withRel("confirm");
        links.add(confirm);

        Link cancel = linkTo(methodOn(PaymentController.class).cancel(id)).withRel("cancel");
        links.add(cancel);

        Resource<PaymentDto> resource = new Resource<>(dto, links);
        return ResponseEntity.created(path).body(resource);
    }

    @PutMapping("/{id}")
    public Resource<PaymentDto> confirm(@PathVariable Long id) {
        Payment payment = paymentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        payment.setStatus(Payment.Status.CONFIRM);
        paymentRepository.save(payment);

        paymentNotifier.notifyConfirmedPayment(payment);

        Long orderId = payment.getOrderId();
        orderRestClient.sendPaidStatus(orderId);

        List<Link> links = new ArrayList<>();

        Link self = linkTo(methodOn(PaymentController.class).detail(id)).withSelfRel();
        links.add(self);

        PaymentDto dto = new PaymentDto(payment);
        return new Resource<>(dto, links);
    }

    @DeleteMapping("/{id}")
    public Resource<PaymentDto> cancel(@PathVariable Long id) {
        Payment payment = paymentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        payment.setStatus(Payment.Status.CANCELED);
        paymentRepository.save(payment);

        List<Link> links = new ArrayList<>();

        Link self = linkTo(methodOn(PaymentController.class).detail(id)).withSelfRel();
        links.add(self);

        PaymentDto dto = new PaymentDto(payment);
        return new Resource<>(dto, links);
    }

}