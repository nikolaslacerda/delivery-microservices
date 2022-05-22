import {MenuItemResponse} from './response/menu-item.response';

export class CartItem {

  menuItemId: number;
  name: string;
  price: number;
  promotionalPrice: number;
  quantity: number;

  constructor(menuItem: MenuItemResponse, quantity: number = 1) {
    this.menuItemId = menuItem.id;
    this.name = menuItem.name;
    this.price = menuItem.price;
    this.promotionalPrice = menuItem.promotionalPrice;
    this.quantity = quantity;
  }

  subtotal(): number {
    return this.price * this.quantity;
  }

  subtotalWithDiscount(): number {
    return this.promotionalPrice * this.quantity;
  }
}
