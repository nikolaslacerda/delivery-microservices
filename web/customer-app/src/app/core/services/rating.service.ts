import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {ReviewRequest} from '../../shared/models/request/review.request.model';
import {ReviewResponse} from '../../shared/models/response/review.response.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  createReview(review: ReviewRequest): Observable<ReviewResponse> {
    const restaurantId = review.restaurantId;
    return this.http.post<ReviewResponse>(`${this.API}/restaurants/${restaurantId}/reviews`, review);
  }

  getOrderReview(orderId: number): Observable<ReviewResponse> {
    const params = new HttpParams().set('orderId', String(orderId));
    return this.http.get<ReviewResponse>(`${this.API}/reviews`, {params});
  }

  getReviewsByRestaurant(restaurantId: number): Observable<ReviewResponse[]> {
    return this.http.get<ReviewResponse[]>(`${this.API}/restaurants/${restaurantId}/reviews`);
  }

  getRestaurantRatingAverage(restaurantId: number): Observable<ReviewResponse[]> {
    return this.http.get<ReviewResponse[]>(`${this.API}/restaurants/${restaurantId}/reviews`);
  }
}
