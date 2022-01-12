import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { PipesModule } from '../pipes/pipes.module';

import { restauranteRoutes } from './restaurantes.routes';

import { RestauranteCadastroComponent } from './restaurante-cadastro/restaurante-cadastro.component';
import { HorariosDeFuncionamentoComponent } from './horarios-de-funcionamento/horarios-de-funcionamento.component';
import { FormasDePagamentoComponent } from './formas-de-pagamento/formas-de-pagamento.component';
import { CardapioListagemComponent } from './restaurant/cardapio/cardapio-listagem.component';
import { CategoriaDoCardapioCadastroComponent } from './restaurant/cardapio/categoria-do-cardapio-cadastro.component';
import { ItemDoCardapioCadastroComponent } from './restaurant/cardapio/item-do-cardapio-cadastro.component';
import { PedidosPendentesComponent } from './pedidos-pendentes/pedidos-pendentes.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';


@NgModule({
  declarations: [
    RestauranteCadastroComponent,
    HorariosDeFuncionamentoComponent,
    FormasDePagamentoComponent,
    CardapioListagemComponent,
    CategoriaDoCardapioCadastroComponent,
    ItemDoCardapioCadastroComponent,
    PedidosPendentesComponent,
    RestaurantCardComponent
  ],
  exports: [
    RestaurantCardComponent
  ],
  imports: [CommonModule, FormsModule, // NgbModule,
    TextMaskModule, restauranteRoutes, PipesModule]
})
export class RestaurantesModule { }
