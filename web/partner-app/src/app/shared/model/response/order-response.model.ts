import {RestaurantOrderResponseModel} from './restaurant.order.response.model';
import {OrderItemResponse} from './order-item-response.model';
import {DeliveryResponse} from './delivery.response.model';

export interface OrderResponse {
  id: number;
  customerId: number;
  restaurant: RestaurantOrderResponseModel;
  delivery: DeliveryResponse;
  paymentId: string;
  items: OrderItemResponse[];
  lastStatus: string;
  deliveryFee: number;
  subtotal: number;
  subtotalWithDiscount: number;
  totalValue: number;
  totalValueWithDiscount: number;
}
