package br.com.caelum.eats.pedido;

import lombok.AllArgsConstructor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static br.com.caelum.eats.pedido.amqp.OrderConfig.UpdateOrderSource;

@RestController
@AllArgsConstructor
class PedidoController {

    private PedidoRepository repo;
    private UpdateOrderSource updateOrderSource;

    @GetMapping("/orders")
    List<PedidoDto> lista() {
        return repo.findAll().stream()
                .map(pedido -> new PedidoDto(pedido)).collect(Collectors.toList());
    }


    @GetMapping("/orders/{id}")
    PedidoDto porId(@PathVariable("id") Long id) {
        Pedido pedido = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException());
        return new PedidoDto(pedido);
    }

    @PostMapping("/orders")
    PedidoDto adiciona(@RequestBody Pedido pedido) {
        pedido.setDataHora(LocalDateTime.now());
        pedido.setStatus(Pedido.Status.REALIZADO);
        pedido.getItens().forEach(item -> item.setPedido(pedido));
        pedido.getEntrega().setPedido(pedido);
        Pedido salvo = repo.save(pedido);
        return new PedidoDto(salvo);
    }

    @PutMapping("/orders/{id}/status")
    PedidoDto atualizaStatus(@RequestBody Pedido pedido) {
        repo.atualizaStatus(pedido.getStatus(), pedido);
        PedidoDto dto = new PedidoDto(pedido);
        updateOrderSource.orderWithUpdatedStatus().send(MessageBuilder.withPayload(dto).build());
        return dto;
    }

    @GetMapping("/partners/restaurants/{restauranteId}/orders/pending")
    List<PedidoDto> pendentes(@PathVariable("restauranteId") Long restauranteId) {
        return repo.doRestauranteSemOsStatus(restauranteId, Arrays.asList(Pedido.Status.REALIZADO, Pedido.Status.ENTREGUE)).stream()
                .map(pedido -> new PedidoDto(pedido)).collect(Collectors.toList());
    }

    @PutMapping("/orders/{id}/paid")
    void setPaid(@PathVariable("id") Long id) {
        Pedido pedido = repo.porIdComItens(id);
        if (pedido == null) {
            throw new ResourceNotFoundException();
        }
        pedido.setStatus(Pedido.Status.PAGO);
        repo.atualizaStatus(Pedido.Status.PAGO, pedido);

        PedidoDto dto = new PedidoDto(pedido);
        updateOrderSource.orderWithUpdatedStatus().send(MessageBuilder.withPayload(dto).build());
    }

}
