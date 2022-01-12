import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PedidosService } from '../../services/pedidos.service';
import {Order} from '../../models/order';

@Component({
  selector: 'app-pedidos-pendentes',
  templateUrl: './pedidos-pendentes.component.html'
})
export class PedidosPendentesComponent implements OnInit {

  pendingOrders: Array<Order>;

  constructor(private route: ActivatedRoute,
              private pedidosService: PedidosService) {
  }

  ngOnInit() {
    const restaurantId = this.route.snapshot.params.restaurantId;
    this.pedidosService.getPendingOrders(restaurantId)
      .subscribe(pendingOrders => this.pendingOrders = pendingOrders);
  }

  confirma(pedido) {
    pedido.status = 'CONFIRMADO';
    this.pedidosService.atualizaStatus(pedido)
      .subscribe();
  }

  avisaPronto(pedido) {
    pedido.status = 'PRONTO';
    this.pedidosService.atualizaStatus(pedido)
      .subscribe();
  }

  avisaSaiu(pedido) {
    pedido.status = 'SAIU_PARA_ENTREGA';
    this.pedidosService.atualizaStatus(pedido)
      .subscribe();
  }

  avisaEntregue(pedido) {
    pedido.status = 'ENTREGUE';
    this.pedidosService.atualizaStatus(pedido)
      .subscribe();
  }

}
