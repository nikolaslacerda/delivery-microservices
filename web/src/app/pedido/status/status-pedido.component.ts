import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PedidosService } from 'src/app/services/pedidos.service';
import { AvaliacoesService } from 'src/app/services/avaliacoes.service';
import {Review} from '../../models/review';
import {Order} from '../../models/order';

@Component({
  selector: 'app-status-pedido',
  templateUrl: './status-pedido.component.html'
})
export class StatusPedidoComponent implements OnInit {

  order: Order = {} as Order;
  review: Review = {} as Review;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pedidoService: PedidosService,
              private avaliacoesService: AvaliacoesService) {
  }

  ngOnInit() {
    const orderId = this.route.snapshot.params.pedidoId;
    this.pedidoService.getOrderById(orderId)
      .subscribe(order => this.order = order);
  }

  createReview() {
    this.review.order = this.order;
    this.avaliacoesService.create(this.review)
      .subscribe(review => {
        this.review = review;
        setTimeout(() => this.router.navigate(['']), 1500);
      });
  }
}
