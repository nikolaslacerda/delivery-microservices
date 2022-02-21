import {PaymentResponse} from './payment-response.model';
import {RestaurantResponse} from './restaurant-response.model';
import {AddressResponse} from './address-response.model';
import {OrderItemResponse} from './order-item-response.model';
import {CustomerResponse} from './customer-response.model';

export class OrderResponse {

  id: number;
  customerId: number;
  createdAt: Date;
  restaurantId: number;
  paymentId: number;
  addressId: number;
  status: string;
  customer: CustomerResponse;
  payment: PaymentResponse;
  restaurant: RestaurantResponse;
  address: AddressResponse;
  items: OrderItemResponse[];


  constructor(id: number, createdAt: Date, customerId: number, restaurantId: number, paymentId: number, addressId: number, status: string, customer: CustomerResponse, payment: PaymentResponse, restaurant: RestaurantResponse, address: AddressResponse, items: OrderItemResponse[]) {
    this.id = id;
    this.customerId = customerId;
    this.createdAt = createdAt;
    this.restaurantId = restaurantId;
    this.paymentId = paymentId;
    this.addressId = addressId;
    this.status = status;
    this.customer = customer;
    this.payment = payment;
    this.restaurant = restaurant;
    this.address = address;
    this.items = items;
  }
}
