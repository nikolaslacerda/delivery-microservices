import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {MenuResponse} from '../../shared/models/response/menu.response.model';
import {MenuItemResponse} from '../../shared/models/response/menu-item.response';
import {MenuCategoryResponse} from '../../shared/models/response/menu-category.response';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getByRestaurant(restaurantId: string): Observable<MenuResponse> {
    return this.http.get<MenuResponse>(`${this.API}/restaurants/${restaurantId}/menu`);
  }

  getCategories(menuId: number): Observable<MenuResponse[]> {
    let params: HttpParams;
    params = new HttpParams().set('active', 'true');
    return this.http.get<MenuResponse[]>(`${this.API}/menu/${menuId}/category`, {params});
  }

  getItems(categoryId: number): Observable<MenuItemResponse[]> {
    let params: HttpParams;
    params = new HttpParams().set('active', 'true');
    return this.http.get<MenuItemResponse[]>(`${this.API}/menuItems?menuCategoryId=${categoryId}`, {params});
  }

  getItemById(menuId: number): Observable<MenuItemResponse> {
    return this.http.get<MenuItemResponse>(`${this.API}/menuItems/${menuId}`);
  }
}
