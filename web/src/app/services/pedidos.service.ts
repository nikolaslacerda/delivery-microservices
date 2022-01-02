import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.API}/orders/${orderId}`);
  }

  createOrder(order): Observable<any> {
    return this.http.post(`${this.API}/orders`, order);
  }

  atualizaStatus(pedido): Observable<any> {
    return this.http.put(`${this.API}/orders/${pedido.id}/status`, pedido);
  }

  pendentes(restauranteId): Observable<any> {
    return this.http.get(`${this.API}/partners/restaurants/${restauranteId}/orders/pending`);
  }

}
