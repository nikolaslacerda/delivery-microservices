export class OrderItemResponse {

  menuItemId: number;
  name: string;
  price: number;
  quantity: number;

  constructor(name: string, price: number, menuItemId: number, quantity: number) {
    this.name = name;
    this.price = price,
      this.menuItemId = menuItemId;
    this.quantity = quantity;
  }
}
