package com.server.deliveryadminservice.repository;

import com.server.deliveryadminservice.model.FormaDePagamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FormaDePagamentoRepository extends JpaRepository<FormaDePagamento, Long> {

    List<FormaDePagamento> findAllByOrderByNomeAsc();

}
