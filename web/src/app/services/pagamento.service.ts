import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {Payment} from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private API = environment.baseUrl + '/payment';

  constructor(private http: HttpClient) {
  }

  create(payment: Payment): Observable<any> {
    return this.http.post(`${this.API}`, payment);
  }

  confirm(payment: Payment): Observable<any> {
    return this.http.put(`${this.API}/${payment.orderId}`, null);
  }

  cancel(payment): Observable<any> {
    return this.http.delete(`${this.API}/${payment.orderId}`, null);
  }

}
