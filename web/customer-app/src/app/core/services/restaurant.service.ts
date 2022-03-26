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
    params = new HttpParams().set('active', 'true');
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

  getPendingRestaurants(): Observable<any> {
    return this.http.get(`${this.API}/admin/restaurants/pending`);
  }

  approveRestaurant(restaurant): Observable<any> {
    return this.http.patch(`${this.API}/admin/restaurants/${restaurant.id}`, restaurant);
  }

}
