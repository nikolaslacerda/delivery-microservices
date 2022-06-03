export class MenuItemUpdateRequest {

  menuCategoryId: number;
  imageUrl?: string;
  name: string;
  description: string;
  unitPrice: number;
  unitOriginalPrice: number;
  active: boolean;

  constructor(model: any = {}) {
    this.menuCategoryId = model.menuCategoryId;
    this.name = model.name;
    this.description = model.description;
    this.unitPrice = model.unitPrice;
    this.unitOriginalPrice = model.unitOriginalPrice;
    this.active = model.active || false;
    this.imageUrl = model?.imageUrl;
  }
}
