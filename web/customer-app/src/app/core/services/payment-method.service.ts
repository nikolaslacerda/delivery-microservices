import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';
import {PaymentMethodResponse} from '../../shared/models/response/payment-method.response';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getRestaurantPaymentMethods(restaurantId: number): Observable<PaymentMethodResponse[]> {
    return this.http.get(`${this.API}/restaurants_paymentMethods?restaurantId=${restaurantId}&_expand=paymentMethod`)
      .pipe(
        map((res: any) => res.map(paymentMethod => (new PaymentMethodResponse(paymentMethod)))
        )
      );
  }
}
