import {MenuItemResponse} from './response/menu-item.response';

export class CartItem {

  menuItemId: number;
  name: string;
  price: number;
  promotionalPrice: number;
  quantity: number;

  constructor(public menuItem: MenuItemResponse, public quantityy: number = 1) {
    this.menuItemId = menuItem.id;
    this.name = menuItem.name;
    this.price = menuItem.promotionalPrice;
    this.promotionalPrice = menuItem.price;
    this.quantity = quantityy;
  }

  value(): number {
    return this.menuItem.price * this.quantity;
  }
}
