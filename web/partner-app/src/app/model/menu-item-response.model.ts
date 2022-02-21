export class MenuItemResponse {

  id: number;
  menuCategoryId: number;
  name: string;
  description: string;
  imageUrl: string;
  unitPrice: number;
  unitOriginalPrice: number;
  active: boolean;

  constructor(model: any = {}) {
    this.id = model.id;
    this.menuCategoryId = model.menuCategoryId;
    this.name = model.name;
    this.description = model.description;
    this.imageUrl = model.imageUrl;
    this.unitPrice = model.unitPrice;
    this.unitOriginalPrice = model.unitOriginalPrice;
    this.active = model.active;
  }
}
