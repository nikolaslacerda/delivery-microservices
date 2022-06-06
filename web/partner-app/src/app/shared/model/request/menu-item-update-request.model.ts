export class MenuItemUpdateRequest {
  name: string;
  description: string;
  price: number;
  promotionalPrice: number;
  active: boolean;

  constructor(model: any = {}) {
    this.name = model.name;
    this.description = model.description;
    this.price = model.price;
    this.promotionalPrice = model.promotionalPrice;
    this.active = model.active;
  }
}
