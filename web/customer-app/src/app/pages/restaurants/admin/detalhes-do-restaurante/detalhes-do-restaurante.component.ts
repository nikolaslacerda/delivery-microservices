import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { MenuService } from 'src/app/services/menu.service';
import { DayOfWeekService } from 'src/app/services/day-of-week.service';

@Component({
  selector: 'app-detalhes-do-restaurant',
  templateUrl: './detalhes-do-restaurante.component.html'
})
export class DetalhesDoRestauranteComponent implements OnChanges {

  @Input() restaurante: any;
  formasDePagamento: Array<any>;
  horariosDeFuncionamento: Array<any>;
  cardapio: any;

  constructor(private formaDePagamentoService: PaymentMethodService,
              private horarioDeFuncionamentoService: ScheduleService,
              private cardapioService: MenuService,
              private diaDaSemanaService: DayOfWeekService) {
  }

  ngOnChanges() {
    this.formaDePagamentoService.getRestaurantPaymentMethods(this.restaurante)
      .subscribe(formas => this.formasDePagamento = formas);

    this.horarioDeFuncionamentoService.getRestaurantSchedule(this.restaurante)
      .subscribe(horarios => this.horariosDeFuncionamento = horarios);

    this.cardapioService.doRestaurante(this.restaurante)
      .subscribe(cardapio => this.cardapio = cardapio);
  }

}
