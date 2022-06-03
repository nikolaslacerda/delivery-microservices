export class RestaurantResponse {

  id: number;
  name: string;
  mainCategory: string;
  minDeliveryTime: number;
  maxDeliveryTime: number;
  deliveryFee: number;
  description: string;
  userRating: number;
  distance: number;
  imageUrl: string;
  menuId: number;
  addressId: number;
  partnerId: number;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name = model.name;
    this.mainCategory = model.mainCategory;
    this.minDeliveryTime = model.minDeliveryTime;
    this.maxDeliveryTime = model.maxDeliveryTime;
    this.deliveryFee = model.deliveryFee;
    this.description = model.description;
    this.userRating = model.userRating;
    this.distance = model.distance;
    this.imageUrl = model.imageUrl;
    this.menuId = model.menuId;
    this.addressId = model.addressId;
    this.partnerId = model.partnerId;
  }
}
