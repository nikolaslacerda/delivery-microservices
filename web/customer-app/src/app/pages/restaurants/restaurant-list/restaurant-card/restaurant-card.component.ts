import {Component, Input, OnInit} from '@angular/core';
import {RestaurantResponse} from '../../../../shared/models/response/restaurant.response.model';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent implements OnInit {

  @Input() restaurant: RestaurantResponse;

  constructor() {
  }

  ngOnInit() {
  }
}
