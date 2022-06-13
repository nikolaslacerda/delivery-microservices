export class RestaurantUpdateRequest {
  name: string;
  mainCategory: string;
  description: string;

  constructor(model: any = {}) {
    this.name = model.name;
    this.mainCategory = model.mainCategory;
    this.description = model.description;
  }
}
