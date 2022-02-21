export class RestaurantWithDistance {
  id: number;
  cnpj: number;
  name: string;
  description: string;
  cep: number;
  address: string;
  deliveryPrice: number;
  minDeliveryTime: number;
  maxDeliveryTime: number;
  approved: boolean;
  cuisineTypeId: number;
  distance: number;
  reviewAverage: number;
}
