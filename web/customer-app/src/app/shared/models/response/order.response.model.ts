import {AddressRequest} from '../request/address.request.model';
import {OrderItemRequest} from '../request/order-item.request';
import {RestaurantResponse} from './restaurant.response.model';
import {PaymentRequest} from '../request/payment.request.model';

export class OrderResponse {
  id: number;
  customerId: number;
  restaurant: RestaurantResponse;
  address: AddressRequest;
  payment: PaymentRequest;
  items: OrderItemRequest[] = [];
  status: string;
  deliveryFee: number;
  subtotal: number;
  total: number;
}
