export class CuisineTypeResponse {

  id: number;
  name: string;
  imageUrl: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name = model.name;
    this.imageUrl = model.imageUrl;
  }
}
