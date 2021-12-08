package com.server;

import com.server.order.PedidoDto;
import com.server.order.PedidoRestClient;
import lombok.AllArgsConstructor;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.stereotype.Service;

import static com.server.amqp.ReceiptConfig.PaymentSink;

@Service
@AllArgsConstructor
class ProcessadorDePagamentos {

    private GeradorDeNotaFiscal notaFiscal;
    private PedidoRestClient pedidos;

    @StreamListener(PaymentSink.CONFIRMED_PAYMENTS)
    void processaPagamento(PagamentoConfirmado pagamento) {
        PedidoDto pedido = pedidos.detalhaPorId(pagamento.getPedidoId());
        String nota = notaFiscal.geraNotaPara(pedido);
        System.out.println(nota); // TODO: enviar XML para SEFAZ
    }
}
