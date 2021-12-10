import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  porId(pedidoId) {
    return this.http.get(`${this.API}/orders/${pedidoId}`);
  }

  adiciona(pedido): Observable<any> {
    return this.http.post(`${this.API}/orders`, pedido);
  }

  atualizaStatus(pedido): Observable<any> {
    return this.http.put(`${this.API}/orders/${pedido.id}/status`, pedido);
  }

  pendentes(restauranteId): Observable<any> {
    return this.http.get(`${this.API}/partners/restaurants/${restauranteId}/orders/pending`);
  }

}
