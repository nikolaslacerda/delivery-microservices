package br.com.caelum.eats.restaurante;

import br.com.caelum.eats.restaurante.RestauranteFormaDePagamento.RestauranteFormaDePagamentoId;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
class RestauranteFormaDePagamentoController {

    private RestauranteFormaDePagamentoRepository restauranteFormaDePagamentoRepo;

    @PostMapping("/partners/restaurants/{idRestaurante}/payment-methods")
    void adiciona(@PathVariable("idRestaurante") Long idRestaurante, @RequestBody Long formaDePagamentoId) {
        RestauranteFormaDePagamentoId id = new RestauranteFormaDePagamentoId(idRestaurante, formaDePagamentoId);
        Restaurante restaurante = new Restaurante();
        restaurante.setId(idRestaurante);
        RestauranteFormaDePagamento restauranteFormaDePagamento = new RestauranteFormaDePagamento(id, restaurante,
                formaDePagamentoId);
        restauranteFormaDePagamentoRepo.save(restauranteFormaDePagamento);
    }

    @DeleteMapping("/partners/restaurants/{idRestaurante}/payment-methods/{idFormaDePagamento}")
    void removeDoRestaurante(@PathVariable("idRestaurante") Long idRestaurante, @PathVariable("idFormaDePagamento") Long idFormaDePagamento) {
        RestauranteFormaDePagamentoId id = new RestauranteFormaDePagamentoId(idRestaurante, idFormaDePagamento);
        restauranteFormaDePagamentoRepo.deleteById(id);
    }

    @GetMapping("/restaurants/{idRestaurante}/payment-methods")
    List<Long> lista(@PathVariable("idRestaurante") Long idRestaurante) {
        Restaurante restaurante = new Restaurante();
        restaurante.setId(idRestaurante);
        return restauranteFormaDePagamentoRepo.findAllByRestauranteOrderByNomeAsc(restaurante);
    }

}
