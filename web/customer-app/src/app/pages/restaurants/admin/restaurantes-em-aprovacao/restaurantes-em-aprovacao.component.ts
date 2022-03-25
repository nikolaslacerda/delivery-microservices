import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/core/services/restaurant.service';

@Component({
  selector: 'app-restaurants-em-aprovacao',
  templateUrl: './restaurantes-em-aprovacao.component.html'
})
export class RestauranteEmAprovacaoComponent implements OnInit {

  restaurantesEmAprovacao: Array<any> = [];
  restauranteEmDetalhe: any;

  constructor(private restaurantesService: RestaurantService) {
  }

  ngOnInit() {
    this.restaurantesService.getPendingRestaurants()
      .subscribe(restaurantes => this.restaurantesEmAprovacao = restaurantes);
  }

  detalha(restaurante) {
    this.restauranteEmDetalhe = restaurante;
  }

  aprova(restaurante) {
    this.restaurantesService.approveRestaurant(restaurante)
      .subscribe(() => {
        restaurante.aprovado = true;
        this.restauranteEmDetalhe = null;
      });
  }
}
