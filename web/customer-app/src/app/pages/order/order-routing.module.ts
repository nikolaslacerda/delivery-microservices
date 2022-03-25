import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from './order/order.component';
import {OrderStatusComponent} from './order-status/order-status.component';
import {LoginGuard} from '../../core/guards/login.guard';
import {OrderListComponent} from './order-list/order-list.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'finish',
    component: OrderComponent,
    canLoad: [LoginGuard],
    canActivate: [LoginGuard]
  },
  {
    path: ':orderId/status',
    component: OrderStatusComponent,
    canLoad: [LoginGuard],
    canActivate: [LoginGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    component: OrderListComponent,
    canLoad: [LoginGuard],
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
