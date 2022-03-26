import {NgModule} from '@angular/core';
import {DayOfWeekPipe} from './day-of-week.pipe';
import {PaymentFormPipe} from './payment-form.pipe';
import {OrderStatusPipe} from './order-status.pipe';
import {OrderStatusIndexPipe} from './order-status-index.pipe';

@NgModule({
  declarations: [
    DayOfWeekPipe,
    PaymentFormPipe,
    OrderStatusPipe,
    OrderStatusIndexPipe
  ],
  exports: [
    DayOfWeekPipe,
    PaymentFormPipe,
    OrderStatusPipe,
    OrderStatusIndexPipe
  ]
})
export class PipesModule {
}
