package br.com.caelum.eats.restaurante;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestauranteDto {

    private Long id;

    private String cnpj;

    private String nome;

    private String descricao;

    private String cep;

    private String endereco;

    private BigDecimal taxaDeEntregaEmReais;

    private Integer tempoDeEntregaMinimoEmMinutos;

    private Integer tempoDeEntregaMaximoEmMinutos;

    private Boolean aprovado;

    private Long tipoDeCozinhaId;

    public RestauranteDto(Restaurante restaurante) {
        this(restaurante.getId(), restaurante.getCnpj(), restaurante.getNome(), restaurante.getDescricao(), restaurante.getCep(), restaurante.getEndereco(),
                restaurante.getTaxaDeEntregaEmReais(), restaurante.getTempoDeEntregaMinimoEmMinutos(),
                restaurante.getTempoDeEntregaMaximoEmMinutos(), restaurante.getAprovado(),
                restaurante.getTipoDeCozinhaId());
    }

    public void populaRestaurante(Restaurante restaurante) {
        restaurante.setCnpj(cnpj);
        restaurante.setNome(nome);
        restaurante.setDescricao(descricao);
        restaurante.setCep(cep);
        restaurante.setEndereco(endereco);
        restaurante.setTaxaDeEntregaEmReais(taxaDeEntregaEmReais);
        restaurante.setTempoDeEntregaMinimoEmMinutos(tempoDeEntregaMinimoEmMinutos);
        restaurante.setTempoDeEntregaMaximoEmMinutos(tempoDeEntregaMaximoEmMinutos);
        restaurante.setTipoDeCozinhaId(tipoDeCozinhaId);
    }

}
