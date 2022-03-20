import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../../services/shopping-cart.service';
import {CartItem} from '../../../models/cart-item';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: []
})
export class ShoppingCartComponent implements OnInit {

  restaurant: any = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private restaurantService: RestaurantService,
              private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.shoppingCartService.restaurantO.subscribe(x => {
      if (x) {
        this.restaurantService.getRestaurantById(x).subscribe(rest => {
          this.restaurant = rest;
        });
      }
    });
  }

  items(): CartItem[] {
    return this.shoppingCartService.getCartItems;
  }

  restaurantId() {
    return this.shoppingCartService.getRestaurant;
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

  finishOrder() {
    this.router.navigateByUrl(`orders/finish`);
  }
}
