package com.server.deliveryadminservice.repository;

import com.server.deliveryadminservice.model.TipoDeCozinha;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TipoDeCozinhaRepository extends JpaRepository<TipoDeCozinha, Long> {

    List<TipoDeCozinha> findAllByOrderByNomeAsc();

}
