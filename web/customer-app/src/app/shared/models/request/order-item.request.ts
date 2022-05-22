export class OrderItemRequest {

  id: number;
  name: string;
  description: string;
  notes: string;
  price: number;
  promotionalPrice: number;
  quantity: number;
  totalPrice: number;
  totalPriceWithDiscount: number;

  constructor(model: any = {}) {
    this.id = model.menuItemId;
    this.name = model.name;
    this.price = model.price;
    this.promotionalPrice = model.promotionalPrice;
    this.quantity = model.quantity;
    this.totalPrice = model.price * model.quantity;
    this.totalPriceWithDiscount = model.promotionalPrice * model.quantity;
  }
}
