import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {CartItem} from '../../models/cart-item';
import {ActivatedRoute} from '@angular/router';
import {RestauranteService} from '../../services/restaurante.service';
import {Restaurant} from '../../models/restaurant';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: []
})
export class ShoppingCartComponent implements OnInit {

  restaurant: Restaurant;

  constructor(private route: ActivatedRoute,
              private restaurantService: RestauranteService,
              private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    const restaurantId = this.route.parent.snapshot.params.restaurantId;
    this.restaurantService.getById(restaurantId).subscribe(restaurant => {
      this.restaurant = restaurant;
    });
  }

  items(): CartItem[] {
    return this.shoppingCartService.items;
  }

  clear() {
    this.shoppingCartService.clear();
  }

  total(): number {
    return this.shoppingCartService.total();
  }

  removeItem(item: any) {
    this.shoppingCartService.removeItem(item);
  }

  addItem(item: any) {
    this.shoppingCartService.addItem(item);
  }

}
