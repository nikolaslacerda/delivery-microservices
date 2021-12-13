package com.server.deliveryadminservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormaDePagamento {

    public enum Tipo {
        CARTAO_CREDITO, CARTAO_DEBITO, VALE_REFEICAO;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Tipo tipo;

    @NotBlank
    @Size(max = 100)
    private String nome;

}
