import { RouterModule, Routes } from '@angular/router';

import { PedidoComponent } from './pedido.component';
import { ListaRestaurantesComponent } from './lista-restaurantes/lista-restaurantes.component';
import { RestauranteComponent } from './restaurante/restaurante.component';
import { PagamentoPedidoComponent } from './pagamento/pagamento-pedido.component';
import { StatusPedidoComponent } from './status/status-pedido.component';

const routes: Routes = [
  {
    path: '',
    component: PedidoComponent
  },
  {
    path: 'orders/:cep',
    component: ListaRestaurantesComponent
  },
  {
    path: 'orders/:cep/tipos-de-cozinha/:tipoDeCozinhaId',
    component: ListaRestaurantesComponent
  },
  {
    path: 'orders/:cep/restaurant/:restauranteId',
    component: RestauranteComponent
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
