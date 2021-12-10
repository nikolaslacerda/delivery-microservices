package com.server.order;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="monolith")
public interface PedidoRestClient {

	@GetMapping("/orders/{pedidoId}")
	public PedidoDto detalhaPorId(@PathVariable("pedidoId") Long pedidoId);

}
