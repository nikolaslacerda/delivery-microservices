import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from './order/order.component';
import {OrderStatusComponent} from './order-status/order-status.component';
import {LoginGuard} from '../../guards/login.guard';
import {UserOrdersComponent} from './user-orders/user-orders.component';

const routes: Routes = [
  {
    path: 'order/finish',
    component: OrderComponent,
    canLoad: [LoginGuard],
    canActivate: [LoginGuard]
  },
  {
    path: 'orders/:orderId/status',
    component: OrderStatusComponent,
    canLoad: [LoginGuard],
    canActivate: [LoginGuard]
  },
  {
    path: 'orders',
    component: UserOrdersComponent,
    canLoad: [LoginGuard],
    canActivate: [LoginGuard]
  }
];

export const orderRoutes = RouterModule.forRoot(routes);
