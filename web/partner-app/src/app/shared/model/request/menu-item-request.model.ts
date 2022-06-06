export class MenuItemRequest {
  name: string;
  description: string;
  price: number;
  promotionalPrice: number;

  constructor(model: any = {}) {
    this.name = model.name;
    this.description = model.description;
    this.price = model.price;
    this.promotionalPrice = model.promotionalPrice;
  }
}
