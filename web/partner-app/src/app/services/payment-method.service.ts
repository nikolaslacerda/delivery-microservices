import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaymentMethodResponse} from '../model/payment-method-response.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  addPaymentMethodToRestaurant(paymentMethodId: number, restaurantId: number): Observable<PaymentMethodResponse> {
    return this.http.post<PaymentMethodResponse>(`${this.API}/restaurants_paymentMethods`, {restaurantId, paymentMethodId});
  }

  getAllPaymentMethods(): Observable<PaymentMethodResponse[]> {
    return this.http.get<PaymentMethodResponse[]>(`${this.API}/paymentMethods`)
      .pipe(map((res: any) => res.map((result: any) => (new PaymentMethodResponse({
        id: undefined,
        paymentMethodId: result.id,
        name: result.name
      })))));
  }

  getRestaurantPaymentMethods(restaurantId: number): Observable<PaymentMethodResponse[]> {
    return this.http.get<PaymentMethodResponse[]>(`${this.API}/restaurants_paymentMethods?restaurantId=${restaurantId}&_expand=paymentMethod`)
      .pipe(map((res: any) => res.map((result: any) => (new PaymentMethodResponse({
        id: result.id,
        paymentMethodId: result.paymentMethod.id,
        name: result.paymentMethod.name
      })))));
  }

  deleteRestaurantPaymentMethod(paymentMethodId: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/restaurants_paymentMethods/${paymentMethodId}`);
  }
}
