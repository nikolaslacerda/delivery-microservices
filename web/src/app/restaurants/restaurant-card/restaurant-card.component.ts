import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from '../../models/restaurant';

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

}
