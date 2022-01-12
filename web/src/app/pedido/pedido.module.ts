import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//  import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TextMaskModule } from 'angular2-text-mask';

import { PedidoComponent } from './pedido.component';
import { RestaurantListComponent } from '../restaurants/restaurant-list/restaurant-list.component';
import { RestaurantComponent } from '../restaurants/restaurant/restaurant.component';
import { PagamentoPedidoComponent } from './pagamento/pagamento-pedido.component';
import { ResumoPedidoComponent } from './resumo/resumo-pedido.component';
import { StatusPedidoComponent } from './status/status-pedido.component';

import { pedidoRoutes } from './pedido.routes';

import { PipesModule } from '../pipes/pipes.module';
import {RestaurantesModule} from '../restaurants/restaurantes.module';
import { MenuComponent } from '../restaurants/restaurant/menu/menu.component';
import { ShoppingCartComponent } from '../restaurants/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from '../restaurants/restaurant/menu/menu-item/menu-item.component';
import { ReviewsComponent } from '../restaurants/restaurant/reviews/reviews.component';

@NgModule({
  declarations: [
    PedidoComponent,
    RestaurantListComponent,
    RestaurantComponent,
    PagamentoPedidoComponent,
    ResumoPedidoComponent,
    StatusPedidoComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent
  ],
  imports: [CommonModule, FormsModule, // NgbModule,
    TextMaskModule, pedidoRoutes, PipesModule, RestaurantesModule]
})
export class PedidoModule { }
