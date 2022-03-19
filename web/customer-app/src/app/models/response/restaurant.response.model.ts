export class RestaurantResponse {
  id: number;
  name: string;
  cnpj: number;
  mainCategory: string;
  minDeliveryTime: number;
  maxDeliveryTime: number;
  cep: number;
  description: string;
  address: string;
  deliveryFee: number;
  distance: number;
  imageUrl: string;
  userRating: number;
}
