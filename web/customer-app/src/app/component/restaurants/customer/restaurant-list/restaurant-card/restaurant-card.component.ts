import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from '../../../../../models/restaurant/restaurant';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: []
})
export class RestaurantCardComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor() {
  }

  ngOnInit() {
  }

  // mediaDeAvaliacoesDosRestaurantes() {
  //   this.avaliacoesService.getRestaurantAverage(this.restaurantesComDetalhes)
  //     .subscribe(infoMedias => {
  //       infoMedias.forEach(infoMedia => {
  //         const restaurante = this.restaurantesComDetalhes.find(restaurante => restaurante.id === infoMedia.restaurantId);
  //         restaurante.average = infoMedia.average;
  //       });
  //     });
  // }

}
