import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {OrderRequest} from '../../shared/models/request/order.request.model';
import {OrderResponse} from '../../shared/models/response/order.response.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  createOrder(order: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.API}/orders`, order);
  }

  getOrderById(orderId: number): Observable<OrderResponse> {
    const params = new HttpParams()
      .append('_expand', 'restaurant');
    return this.http.get<OrderResponse>(`${this.API}/orders/${orderId}`, {params});
  }

  getCustomerOrders(customerId: string): Observable<OrderResponse[]> {
    const params = new HttpParams()
      .set('customerId', customerId)
      .set('_expand', 'restaurant');
    return this.http.get<OrderResponse[]>(`${this.API}/orders/`, {params});
  }
}
