import {OrderItem} from '../order-item';
import {AddressRequest} from './address.request.model';
import {PaymentRequest} from './payment.request.model';

export class OrderRequest {
  customerId: number;
  restaurantId: number;
  address: AddressRequest;
  payment: PaymentRequest;
  items: OrderItem[] = [];
  status: string;
}
