import {NgModule} from '@angular/core';
import {DayOfWeekPipe} from './day-of-week.pipe';
import {TipoDaFormaDePagamentoPipe} from './tipo-da-forma-de-pagamento.pipe';
import {OrderStatusPipe} from './order-status.pipe';
import {OrderStatusIndexPipe} from './order-status-index.pipe';

@NgModule({
  declarations: [
    DayOfWeekPipe,
    TipoDaFormaDePagamentoPipe,
    OrderStatusPipe,
    OrderStatusIndexPipe
  ],
  exports: [
    DayOfWeekPipe,
    TipoDaFormaDePagamentoPipe,
    OrderStatusPipe,
    OrderStatusIndexPipe
  ]
})
export class PipesModule {
}
