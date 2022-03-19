import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TextMaskModule} from 'angular2-text-mask';
import {OrderSummaryComponent} from './order-summary/order-summary.component';
import {OrderStatusComponent} from './order-status/order-status.component';

import {OrderRoutingModule} from './order-routing.module';

import {PipesModule} from '../../shared/pipes/pipes.module';
import {RestaurantModule} from '../restaurants/restaurant.module';
import {SharedModule} from '../../shared/shared.module';
import {OrderItemsComponent} from './order-items/order-items.component';
import {OrderDeliveryCostsComponent} from './order-delivery-costs/order-delivery-costs.component';
import {OrderTimelineComponent} from './order-timeline/order-timeline.component';
import {UserOrdersComponent} from './user-orders/user-orders.component';
import {UserOrderCardComponent} from './user-orders/user-order-card/user-order-card.component';
import {OrderComponent as Orr} from './order.component';
import {OrderComponent} from './order/order.component';

@NgModule({
  declarations: [
    Orr,
    OrderComponent,
    OrderItemsComponent,
    OrderDeliveryCostsComponent,
    OrderSummaryComponent,
    OrderStatusComponent,
    OrderTimelineComponent,
    UserOrdersComponent,
    UserOrderCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
    OrderRoutingModule,
    PipesModule,
    RestaurantModule,
    SharedModule,
    ReactiveFormsModule]
})
export class OrderModule {
}
