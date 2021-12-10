package br.com.caelum.eats.pedido;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.caelum.eats.restaurante.Restaurante;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
class AvaliacaoController {

	private AvaliacaoRepository repo;

	@GetMapping("/restaurants/{restaurantId}/reviews")
	public List<AvaliacaoDto> getReviews(@PathVariable("restaurantId") Long restaurantId) {
		Restaurante restaurant = new Restaurante();
		restaurant.setId(restaurantId);
		return repo.findAllByRestaurante(restaurant).stream().map(AvaliacaoDto::new)
				.collect(Collectors.toList());
	}

	@PostMapping("/restaurants/{restaurantId}/reviews")
	public AvaliacaoDto create(@RequestBody Avaliacao review) {
		Avaliacao salvo = repo.save(review);
		return new AvaliacaoDto(salvo);
	}

	@GetMapping("/restaurants/rating")
	List<MediaAvaliacoesDto> mediaDasAvaliacoesDosRestaurantes(@RequestParam("restaurants") List<Long> idsDosRestaurantes) {
		List<MediaAvaliacoesDto> medias = new ArrayList<>();
		for (Long restauranteId : idsDosRestaurantes) {
			Double media = repo.mediaDoRestaurantePeloId(restauranteId);
			medias.add(new MediaAvaliacoesDto(restauranteId, media));
		}
		return medias;
	}

}
