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

  getRestaurantOrders(restaurantId: number): Observable<OrderResponse[]> {
    const params = new HttpParams()
      .append('restaurantId', String(restaurantId))
      .append('_expand', 'customer')
      .append('_expand', 'address')
      .append('_expand', 'payment');
    return this.http.get<OrderResponse[]>(`${this.API}/orders/`, {params});
  }

  updateStatus(orderId: number, orderStatus: string): Observable<OrderResponse> {
    return this.http.patch<OrderResponse>(`${this.API}/orders/${orderId}`, {status: orderStatus});
  }
}
