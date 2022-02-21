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

  constructor(id: number, name: string, mainCategory: string, minDeliveryTime: number, maxDeliveryTime: number, deliveryFee: number, description: string, userRating: number, distance: number, imageUrl: string, menuId: number, addressId: number, partnerId: number) {
    this.id = id;
    this.name = name;
    this.mainCategory = mainCategory;
    this.minDeliveryTime = minDeliveryTime;
    this.maxDeliveryTime = maxDeliveryTime;
    this.deliveryFee = deliveryFee;
    this.description = description;
    this.userRating = userRating;
    this.distance = distance;
    this.imageUrl = imageUrl;
    this.menuId = menuId;
    this.addressId = addressId;
    this.partnerId = partnerId;
  }
}
