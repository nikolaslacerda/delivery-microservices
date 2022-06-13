export interface RestaurantResponse {
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
}
