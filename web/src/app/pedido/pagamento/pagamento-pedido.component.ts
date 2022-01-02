import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {RestauranteService} from 'src/app/services/restaurante.service';
import {PedidosService} from 'src/app/services/pedidos.service';
import {PagamentoService} from 'src/app/services/pagamento.service';
import {Order} from '../../models/order';
import {Payment} from '../../models/payment';

@Component({
  selector: 'app-pagamento-pedido',
  templateUrl: './pagamento-pedido.component.html'
})
export class PagamentoPedidoComponent implements OnInit {

  order: Order;
  paymentMethods: Array<any>;
  payment = {} as Payment;

  cardNameMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  cardCodeMask = [/\d/, /\d/, /\d/];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pagamentoService: PagamentoService,
              private pedidoService: PedidosService,
              private restaurantesService: RestauranteService) {
  }

  ngOnInit() {
    const orderId = this.route.snapshot.params.pedidoId;
    console.log(orderId);
    this.pedidoService.getOrderById(orderId)
      .subscribe((order: Order) => {
        this.order = order;
        console.log("ORDER ENCONTRADA=>");
        console.log(order);
        this.payment.orderId = order.id;
        this.payment.totalValue = order.total;
        this.restaurantesService.getRestaurantPaymentMethods(order.restaurantId)
          .subscribe(paymentMethods => {
            console.log(paymentMethods);
            this.paymentMethods = paymentMethods;
          });
      });
  }

  createPayment() {
    this.pagamentoService.create(this.payment)
      .subscribe(payment => {
        this.payment = payment;
      });
  }

  confirmPayment() {
    this.pagamentoService.confirm(this.payment)
      .subscribe(payment => this.router.navigateByUrl(`orders/${payment.orderId}/status`));
  }

  cancelPayment() {
    this.pagamentoService.cancel(this.payment)
      .subscribe(() => this.router.navigateByUrl(``));
  }

}
