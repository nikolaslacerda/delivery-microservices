export class MenuResponse {

  id: number;
  restaurantId: number;

  constructor(model: any = {}) {
    this.id = model.id;
    this.restaurantId = model.restaurantId;
  }
}
