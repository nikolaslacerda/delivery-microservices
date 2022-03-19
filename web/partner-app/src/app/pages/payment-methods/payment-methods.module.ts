import {NgModule} from '@angular/core';
import {PaymentMethodsComponent} from './payment-methods.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    PaymentMethodsComponent
  ],
  imports: [
    SharedModule
  ]
})
export class PaymentMethodsModule {
}
