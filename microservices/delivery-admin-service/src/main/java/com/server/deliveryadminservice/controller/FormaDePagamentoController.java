package com.server.deliveryadminservice.controller;

import com.server.deliveryadminservice.model.FormaDePagamento;
import com.server.deliveryadminservice.model.FormaDePagamentoDto;
import com.server.deliveryadminservice.repository.FormaDePagamentoRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
class FormaDePagamentoController {

    private FormaDePagamentoRepository formaRepo;

    @GetMapping("/payment-methods")
    List<FormaDePagamentoDto> lista() {
        return formaRepo.findAllByOrderByNomeAsc().stream().map(FormaDePagamentoDto::new).collect(Collectors.toList());
    }

    @GetMapping("/admin/payment-methods/types")
    List<FormaDePagamento.Tipo> tipos() {
        return Arrays.asList(FormaDePagamento.Tipo.values());
    }

    @PostMapping("/admin/payment-methods")
    FormaDePagamentoDto adiciona(@RequestBody FormaDePagamento tipoDeCozinha) {
        return new FormaDePagamentoDto(formaRepo.save(tipoDeCozinha));
    }

    @PutMapping("/admin/payment-methods/{id}")
    FormaDePagamentoDto atualiza(@RequestBody FormaDePagamento tipoDeCozinha) {
        return new FormaDePagamentoDto(formaRepo.save(tipoDeCozinha));
    }

    @DeleteMapping("/admin/payment-methods/{id}")
    void remove(@PathVariable("id") Long id) {
        formaRepo.deleteById(id);
    }

}
