import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {Review} from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class AvaliacoesService {

  private API = environment.baseUrl + '/restaurants';

  constructor(private http: HttpClient) {
  }

  getByRestaurant(restaurantId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.API}/${restaurantId}/reviews`);
  }

  create(review: Review): Observable<any> {
    const restaurantId = review.order.restaurantId;
    return this.http.post(`${this.API}/${restaurantId}/reviews`, review);
  }

  getRestaurantAverage(restaurants: any[]): Observable<any> {
    const restaurantIds = restaurants.map(restaurant => restaurant.id).join(',');
    return this.http.get(`${this.API}/rating?restaurants=${restaurantIds}`);
  }

}
