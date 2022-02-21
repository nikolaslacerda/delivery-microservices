import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CartItem} from '../models/order/cart-item';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  restaurant: BehaviorSubject<number>;
  restaurantO: Observable<number>;
  items: BehaviorSubject<CartItem[]>;
  itemsO: Observable<CartItem[]>;

  constructor(private http: HttpClient) {
    this.items = new BehaviorSubject<CartItem[]>([]);
    this.itemsO = this.items.asObservable();
    this.restaurant = new BehaviorSubject<any>(undefined);
    this.restaurantO = this.restaurant.asObservable();
  }

  public get getCartItems(): CartItem[] {
    return this.items.value;
  }

  public get getRestaurant() {
    return this.restaurant.value;
  }

  clear() {
    this.items.next([] as CartItem[]);
    this.restaurant.next(undefined);
  }

  total(): number {
    return this.getCartItems.map(item => item.value()).reduce((prev, actual) => prev + actual, 0);
  }

  addItem(item: any) {
    if (item.restaurantId !== this.getRestaurant) {
      console.log('Change restaurant');
      this.clear();
    }
    const foundItem = this.getCartItems.find((menuItem) => menuItem.menuItem.id === item.id);
    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      const push = [...this.getCartItems, new CartItem(item)];
      this.restaurant.next(item.restaurantId);
      this.items.next(push);
    }
  }

  increaseQty(item: CartItem) {
    item.quantity += 1;
    this.items.next(this.getCartItems);
  }

  decreaseQty(item: CartItem) {
    item.quantity -= 1;
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem) {
    this.getCartItems.splice(this.getCartItems.indexOf(item), 1);
    this.items.next(this.getCartItems);
  }
}
