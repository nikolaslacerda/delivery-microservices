package com.server.deliveryadminservice.controller;

import com.server.deliveryadminservice.model.TipoDeCozinha;
import com.server.deliveryadminservice.model.TipoDeCozinhaDto;
import com.server.deliveryadminservice.repository.TipoDeCozinhaRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
class TipoDeCozinhaController {

    private TipoDeCozinhaRepository repo;

    @GetMapping("/cuisine-types")
    List<TipoDeCozinhaDto> lista() {
        return repo.findAllByOrderByNomeAsc().stream().map(TipoDeCozinhaDto::new).collect(Collectors.toList());
    }

    @PostMapping("/admin/tipos-de-cozinha")
    TipoDeCozinhaDto adiciona(@RequestBody TipoDeCozinha tipoDeCozinha) {
        return new TipoDeCozinhaDto(repo.save(tipoDeCozinha));
    }

    @PutMapping("/admin/tipos-de-cozinha/{id}")
    TipoDeCozinhaDto atualiza(@RequestBody TipoDeCozinha tipoDeCozinha) {
        return new TipoDeCozinhaDto(repo.save(tipoDeCozinha));
    }

    @DeleteMapping("/admin/tipos-de-cozinha/{id}")
    void remove(@PathVariable("id") Long id) {
        repo.deleteById(id);
    }

}
