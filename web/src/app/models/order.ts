import {Delivery} from './delivery';
import {OrderItem} from './order-item';

export class Order {
  id: number;
  restaurantId: number;
  delivery: Delivery;
  items: OrderItem[];
  total: number;
  deliveryPrice: number;
  status: string;
}
