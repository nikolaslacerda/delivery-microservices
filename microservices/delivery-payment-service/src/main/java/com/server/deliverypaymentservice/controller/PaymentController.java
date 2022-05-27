package com.server.deliverypaymentservice.controller;

import com.server.deliverypaymentservice.model.entity.Payment;
import com.server.deliverypaymentservice.model.dto.request.PaymentRequest;
import com.server.deliverypaymentservice.model.dto.response.PaymentResponse;
import com.server.deliverypaymentservice.model.enumeration.PaymentStatus;
import com.server.deliverypaymentservice.service.PaymentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/payment")
public class PaymentController {

    private PaymentService paymentService;

    @PostMapping
    public ResponseEntity<Resource<UUID>> createPayment(@Valid @RequestBody PaymentRequest payment,
                                                          UriComponentsBuilder uriBuilder) {
        log.info("Create payment {}", payment);
        UUID transactionId = paymentService.createPayment(payment);
        Resource<UUID> resource = new Resource<>(transactionId, getCreatePaymentLinks(transactionId));
        return ResponseEntity.created(getLocation(uriBuilder, transactionId)).body(resource);
    }

    @GetMapping("/{paymentId}")
    public Resource<PaymentResponse> getPayment(@PathVariable UUID paymentId) {
        log.info("Find payment with id {}", paymentId);
        PaymentResponse payment = paymentService.getPayment(paymentId);
        return new Resource<>(payment, getPaymentLinks(payment));
    }

    @PutMapping("/{paymentId}/confirm")
    public Resource<PaymentResponse> confirmPayment(@PathVariable UUID paymentId) {
        log.info("Confirm payment with id {}", paymentId);
        PaymentResponse payment = paymentService.confirmPayment(paymentId);
        return new Resource<>(payment, getConfirmPaymentLinks(paymentId));
    }

    @PutMapping("/{paymentId}/cancel")
    public Resource<PaymentResponse> cancel(@PathVariable UUID paymentId) {
        log.info("Delete payment with id {}", paymentId);
        PaymentResponse payment = paymentService.cancelPayment(paymentId);
        return new Resource<>(payment, getCancelPaymentLinks(paymentId));
    }

    private URI getLocation(UriComponentsBuilder uriBuilder, UUID transactionId) {
        return uriBuilder
                .path("/payment/{id}")
                .buildAndExpand(transactionId)
                .toUri();
    }

    private List<Link> getCreatePaymentLinks(UUID transactionId) {
        List<Link> links = new ArrayList<>();
        links.add(linkTo(methodOn(PaymentController.class).getPayment(transactionId)).withSelfRel());
        links.add(linkTo(methodOn(PaymentController.class).confirmPayment(transactionId)).withRel("confirm"));
        links.add(linkTo(methodOn(PaymentController.class).cancel(transactionId)).withRel("cancel"));
        return links;
    }

    private List<Link> getPaymentLinks(PaymentResponse payment) {
        List<Link> links = new ArrayList<>();
        links.add(linkTo(methodOn(PaymentController.class).getPayment(payment.getId())).withSelfRel());
        if (PaymentStatus.CREATED.equals(payment.getStatus())) {
            links.add(linkTo(methodOn(PaymentController.class).confirmPayment(payment.getId())).withRel("confirm"));
            links.add(linkTo(methodOn(PaymentController.class).cancel(payment.getId())).withRel("cancel"));
        }
        return links;
    }

    private List<Link> getConfirmPaymentLinks(UUID paymentId) {
        List<Link> links = new ArrayList<>();
        links.add(linkTo(methodOn(PaymentController.class).getPayment(paymentId)).withSelfRel());
        return links;
    }

    private List<Link> getCancelPaymentLinks(UUID paymentId) {
        List<Link> links = new ArrayList<>();
        links.add(linkTo(methodOn(PaymentController.class).getPayment(paymentId)).withSelfRel());
        return links;
    }

}