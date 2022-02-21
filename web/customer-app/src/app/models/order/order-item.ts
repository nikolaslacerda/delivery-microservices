export class OrderItem {

  constructor(quantity: number, menuItemId: number) {
    this.quantity = quantity;
    this.menuItemId = menuItemId;
  }

  quantity: number;
  menuItemId: number;
  price: number;
  promotionalPrice: number;
  name: string;
}
