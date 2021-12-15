package br.com.caelum.eats.restaurante;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
class CardapioController {

    private CardapioRepository repo;

    @GetMapping("/restaurants/{idRestaurante}/menu")
    CardapioDto cardapioDoRestaurante(@PathVariable("idRestaurante") Long idRestaurante) {
        Restaurante restaurante = new Restaurante();
        restaurante.setId(idRestaurante);
        Cardapio cardapio = repo.findByRestaurante(restaurante);
        return new CardapioDto(cardapio);
    }

    @GetMapping("/restaurants/{idRestaurante}/menu/{idCardapio}")
    CardapioDto porId(@PathVariable("idCardapio") Long idCardapio) {
        Cardapio cardapio = repo.findById(idCardapio).orElseThrow(() -> new ResourceNotFoundException());
        return new CardapioDto(cardapio);
    }

}
