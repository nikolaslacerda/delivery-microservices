package br.com.caelum.eats.restaurante;

import br.com.caelum.eats.seguranca.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Restaurante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 18)
    private String cnpj;

    @NotBlank
    @Size(max = 255)
    private String nome;

    @Size(max = 1000)
    private String descricao;

    @NotBlank
    @Size(max = 9)
    private String cep;

    @NotBlank
    @Size(max = 300)
    private String endereco;

    @Positive
    private BigDecimal taxaDeEntregaEmReais;

    @Positive
    @Min(10)
    @Max(180)
    private Integer tempoDeEntregaMinimoEmMinutos;

    @Positive
    @Min(10)
    @Max(180)
    private Integer tempoDeEntregaMaximoEmMinutos;

    private Boolean aprovado;

    private Long tipoDeCozinhaId;

    private Long userId;

}
