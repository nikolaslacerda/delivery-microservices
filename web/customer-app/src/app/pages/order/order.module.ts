import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {OrderSummaryComponent} from './order-summary/order-summary.component';
import {OrderStatusComponent} from './order-status/order-status.component';

import {OrderRoutingModule} from './order-routing.module';

import {PipesModule} from '../../shared/pipes/pipes.module';
import {RestaurantModule} from '../restaurants/restaurant.module';
import {SharedModule} from '../../shared/shared.module';
import {OrderItemsComponent} from './order-items/order-items.component';
import {OrderDeliveryCostsComponent} from './order-delivery-costs/order-delivery-costs.component';
import {OrderTimelineComponent} from './order-timeline/order-timeline.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderCardComponent} from './order-list/order-card/order-card.component';
import {OrderComponent} from './order/order.component';
import {RatingModule} from 'ngx-bootstrap/rating';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {rxStompConfig} from '../../core/config/rx-stomp.config';
import {NgxMaskModule} from 'ngx-mask';


@NgModule({
  declarations: [
    OrderComponent,
    OrderItemsComponent,
    OrderDeliveryCostsComponent,
    OrderSummaryComponent,
    OrderStatusComponent,
    OrderTimelineComponent,
    OrderListComponent,
    OrderCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrderRoutingModule,
    PipesModule,
    RestaurantModule,
    SharedModule,
    ReactiveFormsModule,
    RatingModule,
    NgxMaskModule
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: rxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ]
})
export class OrderModule {
}
