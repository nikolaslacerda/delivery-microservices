import {NgModule} from '@angular/core';
import {OrdersComponent} from './orders.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailComponent
  ],
  imports: [
    SharedModule
  ]
})
export class OrdersModule {
}
