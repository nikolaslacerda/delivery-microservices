import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';
import {MenuResponse} from '../../shared/model/response/menu-response.model';
import {MenuCategoryResponse} from '../../shared/model/response/menu-category-response.model';
import {MenuItemResponse} from '../../shared/model/response/menu-item-response.model';
import {MenuCategoryRequest} from '../../shared/model/request/menu-category-request.model';
import {MenuItemRequest} from '../../shared/model/request/menu-item-request.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private API = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  // Menu

  getMenuByRestaurant(restaurantId: number): Observable<MenuResponse> {
    return this.http.get<MenuResponse>(`${this.API}/restaurants/${restaurantId}/menu`);
  }

  // Categories

  createCategory(restaurantId: number = 1, menuId: number, category: MenuCategoryRequest): Observable<MenuCategoryResponse> {
    return this.http.post<MenuCategoryResponse>(`${this.API}/partners/restaurants/${restaurantId}/menu/${menuId}/categories`, category);
  }

  getCategories(restaurantId: number, menuId: number): Observable<MenuCategoryResponse> {
    return this.http.get<MenuCategoryResponse>(`${this.API}/partners/restaurants/${restaurantId}/menu/${menuId}/categories`);
  }

  editCategory(restaurantId: number, menuId: number, categoryId: number, category: MenuCategoryRequest): Observable<MenuCategoryResponse> {
    return this.http.patch<MenuCategoryResponse>(`${this.API}/partners/restaurants/${restaurantId}/menu/${menuId}/categories/${categoryId}`, category);
  }

  deleteCategory(restaurantId: number, menuId: number, categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/partners/restaurants/${restaurantId}/menu/${menuId}/categories/${categoryId}`);
  }

  // Items

  createItem(menuItem: MenuItemRequest): Observable<MenuItemResponse> {
    return this.http.post<MenuItemResponse>(`${this.API}/menuItems`, menuItem);
  }

  addMenuItemImage(menuItemId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.API}/menuItems/${menuItemId}/update-image`, formData);
  }

  editItem(menuItemId: number, menuItem: MenuItemRequest): Observable<MenuItemResponse> {
    return this.http.patch<MenuItemResponse>(`${this.API}/menuItems/${menuItemId}`, menuItem);
  }

  deleteItem(menuItem: MenuItemResponse): Observable<void> {
    return this.http.delete<void>(`${this.API}/menuItems/${menuItem.id}`);
  }
}
