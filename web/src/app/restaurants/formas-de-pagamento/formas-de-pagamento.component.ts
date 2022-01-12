import {Component, Input, OnInit} from '@angular/core';

import {FormaDePagamentoService} from 'src/app/services/forma-de-pagamento.service';
import {Restaurant} from '../../models/restaurant';

@Component({
  selector: 'app-formas-de-pagamento',
  templateUrl: './formas-de-pagamento.component.html'
})
export class FormasDePagamentoComponent implements OnInit {

  @Input() restaurant: Restaurant;
  allPaymentMethods: Array<any>;
  restaurantPaymentMethods: Array<any>;
  newPaymentMethods: any = {};

  constructor(private formaDePagamentoService: FormaDePagamentoService) {
  }

  ngOnInit() {
    this.formaDePagamentoService.getAllPaymentMethods()
      .subscribe(allPaymentMethods => this.allPaymentMethods = allPaymentMethods);

    this.formaDePagamentoService.getRestaurantPaymentMethods(this.restaurant)
      .subscribe((restaurantPaymentMethods: any) => this.restaurantPaymentMethods = restaurantPaymentMethods);
  }

  adicionaFormaDePagamentoAoRestaurante() {
    if (this.newPaymentMethods) {
      const jaTem = this.restaurantPaymentMethods.some(f => f.id === this.newPaymentMethods.id);
      if (!jaTem) {
        this.newPaymentMethods.restaurante = this.restaurant;
        this.formaDePagamentoService.adicionaAoRestaurante(this.newPaymentMethods)
          .subscribe(() => {
            this.restaurantPaymentMethods.push(this.newPaymentMethods);
            this.restaurantPaymentMethods.sort((a, b) => a.nome.localeCompare(b.nome));
            this.newPaymentMethods = {};
          });
      }
    }
  }

  remove(formaDePagamento) {
    formaDePagamento.restaurante = this.restaurant;
    this.formaDePagamentoService.removeDoRestaurante(formaDePagamento)
      .subscribe(() => {
        this.restaurantPaymentMethods = this.restaurantPaymentMethods.filter(f => f !== formaDePagamento);
      });
  }
}
