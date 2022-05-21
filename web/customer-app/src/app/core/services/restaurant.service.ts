import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {RestaurantResponse} from '../../shared/models/response/restaurant.response.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getRestaurants(search?: string): Observable<RestaurantResponse[]> {
    let params: HttpParams;
    if (search) {
      params = new HttpParams().set('q', search);
    }
    return this.http.get<RestaurantResponse[]>(`${this.API}/restaurants`, {params});
  }

  getRestaurantById(id: number): Observable<RestaurantResponse> {
    return this.http.get<RestaurantResponse>(`${this.API}/restaurants/${id}`);
  }

  getRestaurantsByCategory(category: string): Observable<RestaurantResponse[]> {
    const params = new HttpParams().set('mainCategory', category);
    return this.http.get<RestaurantResponse[]>(`${this.API}/restaurants`, {params});
  }
}
