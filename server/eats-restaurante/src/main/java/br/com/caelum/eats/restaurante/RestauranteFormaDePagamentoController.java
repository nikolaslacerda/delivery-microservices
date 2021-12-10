package br.com.caelum.eats.restaurante;

import java.util.List;

import br.com.caelum.eats.administrativo.FormaDePagamentoDto;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.caelum.eats.administrativo.FormaDePagamento;
import br.com.caelum.eats.restaurante.RestauranteFormaDePagamento.RestauranteFormaDePagamentoId;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
class RestauranteFormaDePagamentoController {

	private RestauranteFormaDePagamentoRepository restauranteFormaDePagamentoRepo;

	@PostMapping("/partners/restaurants/{idRestaurante}/payment-methods")
	void adiciona(@PathVariable("idRestaurante") Long idRestaurante, @RequestBody FormaDePagamento formaDePagamento) {
		RestauranteFormaDePagamentoId id = new RestauranteFormaDePagamentoId(idRestaurante, formaDePagamento.getId());
		Restaurante restaurante = new Restaurante();
		restaurante.setId(idRestaurante);
		RestauranteFormaDePagamento restauranteFormaDePagamento = new RestauranteFormaDePagamento(id, restaurante,
				formaDePagamento);
		restauranteFormaDePagamentoRepo.save(restauranteFormaDePagamento);
	}

	@DeleteMapping("/partners/restaurants/{idRestaurante}/payment-methods/{idFormaDePagamento}")
	void removeDoRestaurante(@PathVariable("idRestaurante") Long idRestaurante, @PathVariable("idFormaDePagamento") Long idFormaDePagamento) {
		RestauranteFormaDePagamentoId id = new RestauranteFormaDePagamentoId(idRestaurante, idFormaDePagamento);
		restauranteFormaDePagamentoRepo.deleteById(id);
	}

	@GetMapping("/restaurants/{idRestaurante}/payment-methods")
	List<FormaDePagamento> lista(@PathVariable("idRestaurante") Long idRestaurante) {
		Restaurante restaurante = new Restaurante();
		restaurante.setId(idRestaurante);
		return restauranteFormaDePagamentoRepo.findAllByRestauranteOrderByNomeAsc(restaurante);
	}

}
