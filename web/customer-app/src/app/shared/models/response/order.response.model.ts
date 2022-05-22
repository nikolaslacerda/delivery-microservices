import {OrderItemRequest} from '../request/order-item.request';
import {PaymentRequest} from '../request/payment.request.model';
import {DeliveryRequest} from '../request/delivery.request.model';
import {RestaurantOrderRequest} from '../restaurant.order.request.model';

export class OrderResponse {
  id: number;
  customerId: number;
  restaurant: RestaurantOrderRequest;
  delivery: DeliveryRequest;
  payment: PaymentRequest;
  items: OrderItemRequest[] = [];
  lastStatus: string;
  deliveryFee: number;
  subtotal: number;
  subtotalWithDiscount: number;
  totalValue: number;
  totalValueWithDiscount: number;
}
