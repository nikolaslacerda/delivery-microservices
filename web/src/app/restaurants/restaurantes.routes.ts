import { RouterModule, Routes } from '@angular/router';

import { RestauranteCadastroComponent } from './restaurante-cadastro/restaurante-cadastro.component';
import { CategoriaDoCardapioCadastroComponent } from './restaurant/cardapio/categoria-do-cardapio-cadastro.component';
import { ItemDoCardapioCadastroComponent } from './restaurant/cardapio/item-do-cardapio-cadastro.component';
import { PedidosPendentesComponent } from './pedidos-pendentes/pedidos-pendentes.component';
import { AuthorizationGuard } from '../guards/authorization.guard';

const routes: Routes = [
  {
    path: 'restaurants2',
    component: RestauranteCadastroComponent
  },
  {
    path: 'restaurants2/:id',
    component: RestauranteCadastroComponent,
    canActivate: [AuthorizationGuard],
    data: { role: 'PARTNER'}
  },
  {
    path: 'restaurants/:restaurantId/menu/:menuId/category/:categoryId',
    component: CategoriaDoCardapioCadastroComponent,
    canActivate: [AuthorizationGuard],
    data: { role: 'PARTNER'}
  },
  {
    path: 'restaurants/:restaurantId/menu/:menuId/category/:categoryId/item',
    component: ItemDoCardapioCadastroComponent,
    canActivate: [AuthorizationGuard],
    data: { role: 'PARTNER'}
  },
  {
    path: 'restaurants/:restaurantId/menu/:menuId/category/:categoryId/item/:itemId',
    component: ItemDoCardapioCadastroComponent,
    canActivate: [AuthorizationGuard],
    data: { role: 'PARTNER'}
  },
  {
    path: 'restaurants/:restaurantId/orders/pending',
    component: PedidosPendentesComponent,
    canActivate: [AuthorizationGuard],
    data: { role: 'PARTNER'}
  }
];

export const restauranteRoutes = RouterModule.forChild(routes);

