import {RouterModule, Routes} from '@angular/router';

import {PedidoComponent} from './pedido.component';
import {RestaurantListComponent} from '../restaurants/restaurant-list/restaurant-list.component';
import {RestaurantComponent} from '../restaurants/restaurant/restaurant.component';
import {PagamentoPedidoComponent} from './pagamento/pagamento-pedido.component';
import {StatusPedidoComponent} from './status/status-pedido.component';
import {HomeComponent} from '../home/home.component';
import {MenuComponent} from '../restaurants/restaurant/menu/menu.component';
import {ReviewsComponent} from '../restaurants/restaurant/reviews/reviews.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'restaurants',
    component: PedidoComponent
  },
  {
    path: 'restaurants/:cep',
    component: RestaurantListComponent
  },
  {
    path: 'restaurants/:cep/tipos-de-cozinha/:tipoDeCozinhaId',
    component: RestaurantListComponent
  },
  {
    path: 'restaurant/:restaurantId',
    component: RestaurantComponent,
    children: [
      {
        path: '',
        redirectTo: 'menu',
        pathMatch: 'full'
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'reviews',
        component: ReviewsComponent
      }
    ]
  },
  {
    path: 'orders/:pedidoId/payment',
    component: PagamentoPedidoComponent
  },
  {
    path: 'orders/:pedidoId/status',
    component: StatusPedidoComponent
  }
];

export const pedidoRoutes = RouterModule.forRoot(routes);
