export class RestaurantImageUpdateRequest {

  name: string;
  mainCategory: string;
  description: string;
  imageUrl: string;

  constructor(model: any = {}) {
    this.name = model.name;
    this.mainCategory = model.mainCategory;
    this.description = model.description;
    this.imageUrl = model.imageUrl;
  }
}
