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
    return this.http.post<PaymentMethodResponse>(`${this.API}/partners/restaurants/${restaurantId}/payment-methods`, {paymentMethodId});
  }

  getAllPaymentMethods(): Observable<PaymentMethodResponse[]> {
    return this.http.get<PaymentMethodResponse[]>(`${this.API}/partners/restaurants/payment-methods`);
  }

  getRestaurantPaymentMethods(restaurantId: number): Observable<PaymentMethodResponse[]> {
    return this.http.get<PaymentMethodResponse[]>(`${this.API}/restaurants/${restaurantId}/payment-methods`);
  }

  deleteRestaurantPaymentMethod(restaurantId: number, paymentMethodId: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/partners/restaurants/${restaurantId}/payment-methods/${paymentMethodId}`);
  }
}
