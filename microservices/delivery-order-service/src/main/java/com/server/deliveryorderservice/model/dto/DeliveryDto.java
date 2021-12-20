package com.server.deliveryorderservice.model.dto;

import com.server.deliveryorderservice.model.dto.ClientDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryDto {

	private Long id;
	private ClientDto client;
	private String cep;
	private String address;
	private String complement;

}
