import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {Restaurant} from '../models/restaurant';
import {RestaurantWithDistance} from '../models/restaurant-with-distance';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private API = environment.baseUrl;
  private DISTANCE_API = environment.baseUrl + '/distances';

  constructor(private http: HttpClient) {
  }

  getById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.API}/restaurants/${id}`);
  }

  getByIds(ids): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.API}/restaurants?ids=${ids}`);
  }

  getNearestRestaurants(cep: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.DISTANCE_API}/restaurants/nearest/${cep}`);
  }

  getNearestRestaurantsByCuisineType(cep: string, cuisineTypeId: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.DISTANCE_API}/restaurants/nearest/${cep}/cuisine-type/${cuisineTypeId}`);
  }

  getRestaurantPaymentMethods(restaurantId: number): Observable<any> {
    return this.http.get(`${this.API}/restaurants/${restaurantId}/payment-methods`);
  }

  doUsuario(user: any): Observable<any> {
    return this.http.get(`${this.API}/partners/restaurants/user/${user.username}`);
  }

  parceiroPorId(id: string): Observable<any> {
    return this.http.get(`${this.API}/partners/restaurants/${id}`);
  }

  salva(restaurante): Observable<any> {
    if (restaurante.id) {
      return this.http.put(`${this.API}/partners/restaurants/${restaurante.id}`, restaurante);
    }
    return this.http.post(`${this.API}/partners/restaurants`, restaurante);
  }

  getPendingRestaurants(): Observable<any> {
    return this.http.get(`${this.API}/admin/restaurants/pending`);
  }

  approveRestaurant(restaurant): Observable<any> {
    return this.http.patch(`${this.API}/admin/restaurants/${restaurant.id}`, restaurant);
  }

  getRestaurantWithDistance(cep: string, restaurantId: string): Observable<RestaurantWithDistance> {
    return this.http.get<RestaurantWithDistance>(`${this.API}/restaurants-with-distance/${cep}/restaurant/${restaurantId}`);
  }

}
