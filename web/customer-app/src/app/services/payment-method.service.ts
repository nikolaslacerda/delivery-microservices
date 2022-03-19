import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  createPaymentMethod(paymentMethod: any): Observable<any> {
    if (paymentMethod.id) {
      return this.http.put(`${this.API}/admin/payment-methods/${paymentMethod.id}`, paymentMethod);
    }
    return this.http.post(`${this.API}/admin/payment-methods`, paymentMethod);
  }

  createRestaurantPaymentMethod(paymentMethodId, restaurantId): Observable<any> {
    return this.http.post(`${this.API}/restaurants_paymentMethods`, {restaurantId, paymentMethodId});
  }

  getAllPaymentMethods(): Observable<any> {
    return this.http.get(`${this.API}/paymentMethods`);
  }

  getRestaurantPaymentMethods(restaurantId): Observable<any> {
    return this.http.get(`${this.API}/restaurants_paymentMethods?restaurantId=${restaurantId}&_expand=paymentMethod`)
      .pipe(map((res: any) => res.map(name => ({id: name.paymentMethod.id, name: name.paymentMethod.name}))));
  }

  deletePaymentMethod(paymentMethod: any) {
    return this.http.delete(`${this.API}/admin/payment-methods/${paymentMethod.id}`);
  }

  deleteRestaurantPaymentMethod(id) {
    return this.http.delete(`${this.API}/restaurants_paymentMethods/${id}`);
  }
}
