import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  updateRestaurant(restaurantId: any, restaurantData: any): any {
    return this.http.patch(`${this.API}/restaurants/${restaurantId}`, restaurantData);
  }

  createRestaurant(restaurant: any): Observable<any> {
    return this.http.post(`${this.API}/restaurants`, restaurant);
  }

  updateRestaurantProfileImage(restaurantId: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.API}/restaurants/${restaurantId}/update-image`, formData);
  }
}
