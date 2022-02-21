import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {Menu} from '../models/restaurant/menu';
import {MenuItem} from '../models/restaurant/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getByRestaurant(restaurantId: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.API}/menus?restaurantId=${restaurantId}`);
  }

  getCategories(menuId: number): Observable<any> {
    return this.http.get<any>(`${this.API}/menuCategories?menuId=${menuId}`);
  }

  getItems(categoryId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.API}/menuItems?menuCategoryId=${categoryId}`);
  }

  doRestaurante(restaurante): Observable<any> {
    return this.http.get(`${this.API}/restaurants/${restaurante.id}/menu`); // DIFERENÇA DE RESTAURANT E POR ID?
  }

  getItemById(menuId: any): Observable<any> {
    return this.http.get(`${this.API}/menuItems/${menuId}`);
  }
}
