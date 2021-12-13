package br.com.caelum.eats.restaurante;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RestauranteService {

    private RestauranteRepository repo;

    public Page<Restaurante> findAllByAprovado(boolean aprovado, Pageable limit) {
        return repo.findAllByAprovado(aprovado, limit);
    }

    public Page<Restaurante> findAllByAprovadoAndTipoDeCozinhaId(boolean aprovado, Long tipo, Pageable limit) {
        return repo.findAllByAprovadoAndTipoDeCozinhaId(aprovado, tipo, limit);
    }

    public Optional<Restaurante> findById(Long id) {
        return repo.findById(id);
    }

}
