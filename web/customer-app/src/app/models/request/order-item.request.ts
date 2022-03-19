export class OrderItemRequest {

  menuItemId: number;
  name: string;
  price: number;
  promotionalPrice: number;
  quantity: number;

  constructor(model: any = {}) {
    this.menuItemId = model.menuItemId;
    this.name = model.name;
    this.price = this.price;
    this.promotionalPrice = this.promotionalPrice;
    this.quantity = model.quantity;
  }
}
