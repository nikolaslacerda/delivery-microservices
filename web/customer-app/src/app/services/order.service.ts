import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {OrderRequest} from '../models/order/request/order.request.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  createOrder(order): Observable<any> {
    return this.http.post(`${this.API}/orders`, order);
  }

  getOrderById(orderId: number): Observable<OrderRequest> {
    const params = new HttpParams()
      .append('_expand', 'restaurant')
      .append('_expand', 'address')
      .append('_expand', 'payment');
    return this.http.get<OrderRequest>(`${this.API}/orders/${orderId}`, {params});
  }

  getCustomerOrders(customerId: string): Observable<Array<OrderRequest>> {
    const params = new HttpParams()
      .set('customerId', customerId)
      .set('_expand', 'restaurant');
    return this.http.get<Array<OrderRequest>>(`${this.API}/orders/`, {params});
  }
}
