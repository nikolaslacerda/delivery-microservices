import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {Review} from '../models/order/review';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private API = environment.baseUrl + '/restaurants';

  constructor(private http: HttpClient) {
  }

  createReview(review: Review): Observable<any> {
    const restaurantId = review.order.restaurantId;
    return this.http.post(`${this.API}/${restaurantId}/reviews`, review);
  }

  getReviewsByRestaurant(restaurantId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.API}/${restaurantId}/reviews`);
  }

  getRestaurantRatingAverage(restaurantId: string): Observable<any> {
    return this.http.get<Review[]>(`${this.API}/${restaurantId}/reviews`);
  }

}
