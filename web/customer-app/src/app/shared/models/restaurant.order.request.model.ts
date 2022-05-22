export class RestaurantOrderRequest {
  id: number;
  name: string;
  address: string;
  phoneNumber: number;
  logo: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name = model.name;
    this.address = model.address;
    this.logo = model.imageUrl;
    this.phoneNumber = model.phoneNumber;
  }
}
