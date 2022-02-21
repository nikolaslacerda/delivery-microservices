import {NgModule} from '@angular/core';
import {OrderStatusPipe} from './order-status.pipe';
import {OrderStatusIndexPipe} from './order-status-index.pipe';
import {PaymentMethodPipe} from './payment-method.pipe';

@NgModule({
  declarations: [
    OrderStatusPipe,
    OrderStatusIndexPipe,
    PaymentMethodPipe,
  ],
  exports: [
    OrderStatusPipe,
    OrderStatusIndexPipe,
    PaymentMethodPipe,
  ]
})
export class PipesModule {
}
