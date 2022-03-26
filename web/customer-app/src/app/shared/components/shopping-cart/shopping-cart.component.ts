import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../../core/services/shopping-cart.service';
import {CartItem} from '../../models/cart-item';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantService} from '../../../core/services/restaurant.service';
import {RestaurantResponse} from '../../models/response/restaurant.response.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  restaurant = {} as RestaurantResponse;
  cartCount: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private restaurantService: RestaurantService,
              private shoppingCartService: ShoppingCartService) {
    this.shoppingCartService.itemsObservable.subscribe(items => {
      this.cartCount = items.map(item => item.quantity).reduce((x, y) => x + y, 0);
    });
  }

  ngOnInit() {
    this.shoppingCartService.restaurantObservable.subscribe(idNewRestaurant => {
      if (idNewRestaurant) {
        this.restaurantService.getRestaurantById(idNewRestaurant).subscribe(restaurant => {
          this.restaurant = restaurant;
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
