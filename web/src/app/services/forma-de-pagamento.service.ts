import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {Restaurant} from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class FormaDePagamentoService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getAllPaymentMethods(): Observable<any> {
    return this.http.get(`${this.API}/payment-methods`);
  }

  getRestaurantPaymentMethods(restaurant: Restaurant): Observable<any> {
    return this.http.get(`${this.API}/restaurants/${restaurant.id}/payment-methods`);
  }

  salva(formaDePagamento: any): Observable<any> {
    if (formaDePagamento.id) {
      return this.http.put(`${this.API}/admin/payment-methods/${formaDePagamento.id}`, formaDePagamento);
    }
    return this.http.post(`${this.API}/admin/payment-methods`, formaDePagamento);
  }

  remove(formaDePagamento: any) {
    return this.http.delete(`${this.API}/admin/payment-methods/${formaDePagamento.id}`);
  }

  tipos(): Observable<any> {
    return this.http.get(`${this.API}/admin/payment-methods/tipos`);
  }

  adicionaAoRestaurante(formaDePagamento): Observable<any> {
    return this.http.post(`${this.API}/partners/restaurants/${formaDePagamento.restaurante.id}/payment-methods`, formaDePagamento);
  }

  removeDoRestaurante(formaDePagamento) {
    return this.http.delete(`${this.API}/partners/restaurants/${formaDePagamento.restaurante.id}/payment-methods/${formaDePagamento.id}`);
  }


}
