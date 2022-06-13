import {AddressResponse} from './address.response';

export class RestaurantResponse {
  id: number;
  name: string;
  cnpj: number;
  phoneNumber: number;
  mainCategory: string;
  minDeliveryTime: number;
  maxDeliveryTime: number;
  cep: number;
  description: string;
  address: AddressResponse;
  deliveryFee: number;
  distance: number;
  imageUrl: string;
  userRating: number;
}
