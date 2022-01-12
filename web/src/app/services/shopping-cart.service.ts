import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from 'src/environments/environment';
import {MenuItem} from '../models/menu-item';
import {CartItem} from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  items: CartItem[] = [];

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  clear() {
    this.items = [];
  }

  total(): number {
    return this.items.map(item => item.value()).reduce((prev, actual) => prev + actual, 0);
  }

  addItem(item: MenuItem) {
    const foundItem = this.items.find((menuItem) => menuItem.menuItem.id === item.id);
    if (foundItem) {
      foundItem.quantity += 1;
    } else {
      this.items.push(new CartItem(item));
    }
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
