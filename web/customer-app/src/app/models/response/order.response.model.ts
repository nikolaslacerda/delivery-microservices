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

  constructor(model: any = {}) {
    this.id = model.id;
    this.customerId = model.customerId;
    this.restaurant = model.restaurant;
    this.address = model.address;
    this.payment = model.payment;
    this.items = model.items;
    this.status = model.status;
    this.deliveryFee = model.deliveryFee;
    this.subtotal = model.subtotal;
    this.total = model.total;
  }
}
