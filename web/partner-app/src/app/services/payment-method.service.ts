import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  createRestaurantPaymentMethod(paymentMethodId: number, restaurantId: number): Observable<any> {
    return this.http.post(`${this.API}/restaurants_paymentMethods`, {restaurantId, paymentMethodId});
  }

  getAllPaymentMethods(): Observable<any> {
    return this.http.get(`${this.API}/paymentMethods`);
  }

  getRestaurantPaymentMethods(restaurantId: number): Observable<any> {
    return this.http.get(`${this.API}/restaurants_paymentMethods?restaurantId=${restaurantId}&_expand=paymentMethod`);
    // .pipe(map((res: any) => res.map((result: any) => ({id: result.paymentMethod.id, name: result.paymentMethod.name}))));
  }

  deleteRestaurantPaymentMethod(paymentMethodId: any): Observable<any> {
    return this.http.delete(`${this.API}/restaurants_paymentMethods/${paymentMethodId}`);
  }
}
