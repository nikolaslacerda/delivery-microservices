package br.com.caelum.eats.administrativo;

import java.util.Arrays;
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
