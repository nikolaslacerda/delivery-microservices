package br.com.caelum.eats.restaurante;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

interface RestauranteRepository extends JpaRepository<Restaurante, Long> {

    List<Restaurante> findAllByAprovado(boolean aprovado);

    Page<Restaurante> findAllByAprovadoAndTipoDeCozinhaId(boolean aprovado, Long tipoId, Pageable limit);

    Page<Restaurante> findAllByAprovado(boolean aprovado, Pageable limit);

    Restaurante findByUserId(Long userId);

    @Modifying(clearAutomatically = true)
    @Query("update Restaurante r set r.aprovado = true where r.id = :id")
    void aprovaPorId(@Param("id") Long id);

}
