import {AddressRequest} from '../request/address.request.model';

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
  address: AddressRequest;
  deliveryFee: number;
  distance: number;
  imageUrl: string;
  userRating: number;
}
