import {OrderItemRequest} from './order-item.request';
import {AddressRequest} from './address.request.model';
import {PaymentRequest} from './payment.request.model';

export class OrderRequest {

  customerId: number;
  restaurantId: number;
  address: AddressRequest;
  payment: PaymentRequest;
  items: OrderItemRequest[] = [];
  status: string;
  deliveryFee: number;
  subtotal: number;
  total: number;

  constructor(model: any = {}) {
    this.customerId = model.customerId;
    this.restaurantId = model.restaurantId;
    this.address = model.address;
    this.payment = model.payment;
    this.items = model.items;
    this.status = model.status;
    this.deliveryFee = model.deliveryFee;
    this.subtotal = model.subtotal;
    this.total = model.total;
  }
}
