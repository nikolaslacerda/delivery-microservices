import {Injectable} from '@angular/core';
import {CartItem} from '../../shared/models/cart-item';
import {BehaviorSubject, Observable} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {
  ChangeRestaurantModalComponent
} from '../../shared/components/shopping-cart/change-restaurant-modal/change-restaurant-modal.component';
import {MenuItemResponse} from '../../shared/models/response/menu-item.response';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  restaurant: BehaviorSubject<number>;
  restaurantObservable: Observable<number>;
  items: BehaviorSubject<CartItem[]>;
  itemsObservable: Observable<CartItem[]>;
  bsModalRef: BsModalRef | undefined;

  constructor(private modalService: BsModalService) {
    this.items = new BehaviorSubject<CartItem[]>([]);
    this.itemsObservable = this.items.asObservable();
    this.restaurant = new BehaviorSubject<number>(undefined);
    this.restaurantObservable = this.restaurant.asObservable();
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

  handleAddItem(item: MenuItemResponse) {
    if (this.getRestaurant !== undefined && item.restaurantId !== this.getRestaurant) {
      this.bsModalRef = this.modalService.show(ChangeRestaurantModalComponent);
      this.bsModalRef.content.event.subscribe(() => {
        this.clear();
        this.addItem(item);
      });
    } else {
      this.addItem(item);
    }
  }

  private addItem(item: MenuItemResponse) {
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
    if (this.getCartItems.length === 0) {
      this.restaurant.next(undefined);
    }
  }
}
