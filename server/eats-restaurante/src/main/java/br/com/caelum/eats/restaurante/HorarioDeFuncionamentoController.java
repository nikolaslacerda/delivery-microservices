package br.com.caelum.eats.restaurante;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
class HorarioDeFuncionamentoController {

	private HorarioDeFuncionamentoRepository repo;
	
	@GetMapping("/restaurants/{idRestaurante}/business-hours/{id}")
	public HorarioDeFuncionamentoDto detalha(@PathVariable("id") Long id) {
		HorarioDeFuncionamento horario = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException());
		return new HorarioDeFuncionamentoDto(horario);
	}

	@GetMapping("/restaurants/{idRestaurante}/business-hours")
	public List<HorarioDeFuncionamentoDto> lista(@PathVariable("idRestaurante") Long idRestaurante) {
		Restaurante restaurante = new Restaurante();
		restaurante.setId(idRestaurante);
		List<HorarioDeFuncionamento> horariosDoRestaurante = repo.findAllByRestaurante(restaurante);
		return horariosDoRestaurante.stream().map(h -> new HorarioDeFuncionamentoDto(h)).collect(Collectors.toList());
	}

	@PostMapping("/partners/restaurants/{idRestaurante}/business-hours")
	public HorarioDeFuncionamento adiciona(@RequestBody HorarioDeFuncionamento horarioDeFuncionamento) {
		return repo.save(horarioDeFuncionamento);
	}

	@PutMapping("/partners/restaurants/{idRestaurante}/business-hours/{id}")
	public HorarioDeFuncionamento atualiza(@RequestBody HorarioDeFuncionamento horarioDeFuncionamento) {
		return repo.save(horarioDeFuncionamento);
	}

	@DeleteMapping("/partners/restaurants/{idRestaurante}/business-hours/{id}")
	public void remove(@PathVariable("id") Long id) {
		repo.deleteById(id);
	}

}
