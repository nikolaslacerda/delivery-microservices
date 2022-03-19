import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {ReviewRequest} from '../models/request/review.request.model';
import {ReviewResponse} from '../models/response/review.response.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private API = environment.baseUrl + '/restaurants';

  constructor(private http: HttpClient) {
  }

  createReview(review: ReviewRequest): Observable<any> {
    const restaurantId = review.order.restaurantId;
    return this.http.post(`${this.API}/${restaurantId}/reviews`, review);
  }

  getReviewsByRestaurant(restaurantId: string): Observable<ReviewResponse[]> {
    return this.http.get<ReviewResponse[]>(`${this.API}/${restaurantId}/reviews`);
  }

  getRestaurantRatingAverage(restaurantId: string): Observable<ReviewResponse[]> {
    return this.http.get<ReviewResponse[]>(`${this.API}/${restaurantId}/reviews`);
  }

}
