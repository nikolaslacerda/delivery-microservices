package com.server.deliverypaymentservice;

import lombok.AllArgsConstructor;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;


@RestController
@AllArgsConstructor
@RequestMapping("/payment")
class PaymentController {

    private PaymentRepository paymentRepository;
    private OrderRestClient orderRestClient;

    @GetMapping("/{id}")
    public EntityModel<PaymentDto> detail(@PathVariable("id") Long id) {
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
        return EntityModel.of(dto, links);
    }

    @PostMapping
    public ResponseEntity<EntityModel<PaymentDto>> create(@RequestBody Payment pagamento,
                                                          UriComponentsBuilder uriBuilder) {
        pagamento.setStatus(Payment.Status.CREATED);
        Payment salvo = paymentRepository.save(pagamento);
        URI path = uriBuilder.path("/payments/{id}").buildAndExpand(salvo.getId()).toUri();
        PaymentDto dto = new PaymentDto(salvo);

        Long id = salvo.getId();

        List<Link> links = new ArrayList<>();

        Link self = linkTo(methodOn(PaymentController.class).detail(id)).withSelfRel();
        links.add(self);

        Link confirm = linkTo(methodOn(PaymentController.class).confirm(id)).withRel("confirm");
        links.add(confirm);

        Link cancel = linkTo(methodOn(PaymentController.class).cancel(id)).withRel("cancel");
        links.add(cancel);

        EntityModel<PaymentDto> resource = EntityModel.of(dto, links);
        return ResponseEntity.created(path).body(resource);
    }

    @PutMapping("/{id}")
    public EntityModel<PaymentDto> confirm(@PathVariable Long id) {
        Payment payment = paymentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        payment.setStatus(Payment.Status.CONFIRM);
        paymentRepository.save(payment);

        Long orderId = payment.getOrderId();
        orderRestClient.sendPaidStatus(orderId);

        List<Link> links = new ArrayList<>();

        Link self = linkTo(methodOn(PaymentController.class).detail(id)).withSelfRel();
        links.add(self);

        PaymentDto dto = new PaymentDto(payment);
        return EntityModel.of(dto, links);
    }

    @DeleteMapping("/{id}")
    public EntityModel<PaymentDto> cancel(@PathVariable Long id) {
        Payment payment = paymentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        payment.setStatus(Payment.Status.CANCELED);
        paymentRepository.save(payment);

        List<Link> links = new ArrayList<>();

        Link self = linkTo(methodOn(PaymentController.class).detail(id)).withSelfRel();
        links.add(self);

        PaymentDto dto = new PaymentDto(payment);
        return EntityModel.of(dto, links);
    }

}