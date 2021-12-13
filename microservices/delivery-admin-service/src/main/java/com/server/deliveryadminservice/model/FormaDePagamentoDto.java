package com.server.deliveryadminservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.server.deliveryadminservice.model.FormaDePagamento.Tipo;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormaDePagamentoDto {

    private Long id;
    private Tipo tipo;
    private String nome;

    public FormaDePagamentoDto(FormaDePagamento forma) {
        this(forma.getId(), forma.getTipo(), forma.getNome());
    }

}
