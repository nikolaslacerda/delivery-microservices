import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {Restaurant} from '../models/restaurant/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private API = environment.baseUrl;

  // private DISTANCE_API = environment.baseUrl + '/distances';

  constructor(private http: HttpClient) {
  }

  getRestaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams;
    if (search) {
      params = new HttpParams().set('q', search);
    }
    return this.http.get<Restaurant[]>(`${this.API}/restaurants`, {params});
  }

  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.API}/restaurants/${id}`);
  }

  getRestaurantsByCategory(category: string): Observable<Restaurant[]> {
    const params = new HttpParams().set('mainCategory', category);
    return this.http.get<Restaurant[]>(`${this.API}/restaurants`, {params});
  }

  getPendingRestaurants(): Observable<any> {
    return this.http.get(`${this.API}/admin/restaurants/pending`);
  }

  approveRestaurant(restaurant): Observable<any> {
    return this.http.patch(`${this.API}/admin/restaurants/${restaurant.id}`, restaurant);
  }

  // getRestaurantWithDistance(cep: string, restaurantId: string): Observable<Restaurant> {
  //   return this.http.get<RestaurantWithDistance>(`${this.API}/restaurants-with-distance/${cep}/restaurant/${restaurantId}`);
  // }
}
