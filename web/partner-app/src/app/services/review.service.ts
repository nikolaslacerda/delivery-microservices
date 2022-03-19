import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReviewResponse} from '../model/review-response.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private API = environment.baseUrl + '/restaurants';

  constructor(private http: HttpClient) {
  }

  getReviewsByRestaurant(restaurantId: number, page: number): Observable<ReviewResponse[]> {
    return this.http.get<ReviewResponse[]>(`${this.API}/${restaurantId}/reviews?_page=${page}`);
  }

  getReviewsByRestaurant2(restaurantId: number): Observable<ReviewResponse[]> {
    return this.http.get<ReviewResponse[]>(`${this.API}/${restaurantId}/reviews`);
  }

  getRestaurantRatingAverage(restaurantId: string): Observable<any> {
    return this.http.get<ReviewResponse[]>(`${this.API}/${restaurantId}/reviews`);
  }
}
