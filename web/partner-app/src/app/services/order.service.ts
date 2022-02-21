import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {OrderResponse} from '../model/order-response.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.API}/orders`, order);
  }

  getRestaurantOrders(restaurantId: number): Observable<Array<OrderResponse>> {
    const params = new HttpParams()
      .append('restaurantId', String(restaurantId))
      .append('_expand', 'customer')
      .append('_expand', 'address')
      .append('_expand', 'payment');
    return this.http.get<Array<OrderResponse>>(`${this.API}/orders/`, {params});
  }

  updateStatus(orderId: number, orderStatus: string): Observable<any> {
    return this.http.patch(`${this.API}/orders/${orderId}`, {status: orderStatus});
  }
}
