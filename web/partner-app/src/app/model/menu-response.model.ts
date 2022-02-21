export class MenuResponse {

  id: number;
  restaurantId: number;

  constructor(id: number, restaurantId: number) {
    this.id = id;
    this.restaurantId = restaurantId;
  }
}
