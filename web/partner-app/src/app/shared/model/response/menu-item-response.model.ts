export class MenuItemResponse {

  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  promotionalPrice: number;
  active: boolean;
  newImage?: any;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name = model.name;
    this.description = model.description;
    this.imageUrl = model.imageUrl;
    this.price = model.price;
    this.promotionalPrice = model.promotionalPrice;
    this.active = model.active;
  }
}
