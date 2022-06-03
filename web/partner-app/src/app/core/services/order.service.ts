import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {OrderResponse} from '../../shared/model/response/order-response.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getRestaurantOrders(restaurantId: number): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`${this.API}/orders/restaurant/${restaurantId}`);
  }

  updateStatus(orderId: number, orderStatus: string): Observable<OrderResponse> {
    return this.http.patch<OrderResponse>(`${this.API}/orders/${orderId}/status`, {status: orderStatus});
  }
}
