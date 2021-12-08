package com.server.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClienteDto {

	private String nome;

	private String cpf;

	private String email;

	private String telefone;

}
