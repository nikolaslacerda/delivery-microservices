import {OrderItemRequest} from './order-item.request';
import {PaymentRequest} from './payment.request.model';
import {RestaurantOrderRequest} from '../restaurant.order.request.model';
import {DeliveryRequest} from './delivery.request.model';

export class OrderRequest {
  customerId: number;
  restaurant: RestaurantOrderRequest;
  delivery: DeliveryRequest;
  payment: PaymentRequest;
  items: OrderItemRequest[] = [];
  deliveryFee: number;
  subtotal: number;
  subtotalWithDiscount: number;
  totalValue: number;
  totalValueWithDiscount: number;

  constructor(model: any = {}) {
    this.customerId = model.customerId;
    this.restaurant = model.restaurant;
    this.delivery = model.delivery;
    this.payment = model.payment;
    this.items = model.items;
    this.deliveryFee = model.deliveryFee;
    this.subtotal = model.subtotal;
    this.subtotalWithDiscount = model.subtotalWithDiscount;
    this.totalValue = model.total;
    this.totalValueWithDiscount = model.totalValueWithDiscount;
  }
}
